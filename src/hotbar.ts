import { Settings } from "./settings";
import { HotbarFlags } from "./hotbarLoader";

export class Hotbar { 
    private userHotbar: { [slot: string ]: string | null }

    constructor(private settings: Settings, private hotbarFlag: HotbarFlags, private user: User) { }

    public save(controlledTokens: Token[], macros: any) {
        if (controlledTokens.length != 1) return false;

        let entity = this.getEntity(controlledTokens[0]);
        let tokenBars = this.hotbarFlag.get(entity);
        let id = entity.id;

        tokenBars[id] = macros.map((item: any) => { return {
            slot: item.slot,
            id: item.macro._id
        }});

        console.debug("[Token Hotbar]", "Saving", id, tokenBars);
        this.hotbarFlag.set(entity, tokenBars);
    }

    public load(controlledTokens: Token[], userHotbar: { [slot: number]: string }) {
        if (controlledTokens.length != 1) return false;
        this.userHotbar = userHotbar;
        
        const entity = this.getEntity(controlledTokens[0]);
        const hotBars = this.hotbarFlag.get(entity);

        console.debug("[Token Hotbar]", "Loading", entity.id, hotBars[entity.id]);

        for(let slot of this.getSlots()) {
            let slotMacro = (hotBars[entity.id] || []).find(m => m.slot == slot);
            const tokenHotbarSlotIsEmpty = !slotMacro;
            if (tokenHotbarSlotIsEmpty) {
                this.unset(slot);
            }
            else {
                let tokenMacro = game.macros.find((m: Macro) => m.id === slotMacro!.id);
                if (tokenMacro) {
                    this.userHotbar[slot] = tokenMacro.id;
                }
                else {
                    this.unset(slot);
                }
            }
        }
        return this.user.update({ hotbar: this.userHotbar });
    }

    public remove(tokenId: string) {
        const entity = game.actors.get(tokenId) || game.tokens.get(tokenId);
        const flags = this.hotbarFlag.get(entity);
        delete flags[entity.id];
        this.hotbarFlag.set(entity, flags);
    }

    private getEntity(token: Token) : Token | Actor {
        if(this.settings.alwaysLinkToActor || (token.data.actorLink && this.settings.linkToLinkedActor)) {
            return token.actor;
        }
        return token;
    }

    private getSlots() {
        function range(size: number, startAt = 0) {
            return [...Array(size).keys()].map(i => i + startAt);
        }

        return range(10, (this.settings.hotbarPage - 1) * 10);
    }

    private unset(slot: number) {
        delete this.userHotbar[slot];
        this.userHotbar[`-=${slot}`] = null;
    }
}