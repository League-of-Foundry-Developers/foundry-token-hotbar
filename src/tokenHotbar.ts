import { Settings } from "./settings";
import { HotbarFlags } from "./hotbarFlags";
import { Notifier } from "./notifier";

export class TokenHotbar { 
    private userHotbar: { [slot: string ]: string | null }

    constructor(
        private settings: Settings,
        private hotbarFlag: HotbarFlags,
        private user: User,
        private notifier: Notifier,
        private currentPage: number) { }

    public save(controlledTokens: Token[], macros: any) {
        if (controlledTokens.length != 1) return false;
        if (this.currentPage != this.settings.hotbarPage) return false;

        const slots = this.getSlots();
        const currentMacros = macros.filter(m => m.macro && slots.includes(m.slot));
        const entity = this.getEntity(controlledTokens[0]);
        let tokenMacros = this.hotbarFlag.get(entity)[entity.id] || [];

        // FIXME: this seems very inefficient
        if (!this.hasChanges(currentMacros, tokenMacros)) return false;
        if (!this.canSave()) {
            this.notifier.warn("The token hotbar is locked for players. Any macros placed on this page will be replaced.")
            return false;
        }

       
        let tokenBars = this.hotbarFlag.get(entity);

        tokenBars[entity.id] = macros
            .filter(m => m.macro && slots.includes(m.slot))
            .map(item => { 
                return {
                    slot: item.slot,
                    id: item.macro._id
                }
            });

        console.debug("[Token Hotbar]", "Saving", entity.id, tokenBars);

        this.hotbarFlag.set(entity, tokenBars);
        return true;
    }

    // Returns true if the token has macros on the token hotbar
    //         otherwise false
    public load(controlledTokens: Token[], userHotbar: { [slot: number]: string }) {
        if (controlledTokens.length != 1) return Promise.resolve(false);
        
        this.userHotbar = userHotbar;
        
        const entity = this.getEntity(controlledTokens[0]);
        const hotBars = this.hotbarFlag.get(entity)[entity.id] || [];
        
        console.debug("[Token Hotbar]", "Loading", entity.id, hotBars);

        for(let slot of this.getSlots()) {
            let slotMacro = hotBars.find(m => m.slot == slot);
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
        return this.user.update({ hotbar: this.userHotbar })
            .then(() => hotBars.length > 0);
    }

    public remove(tokenId: string) {
        const entity = game.actors.get(tokenId) || canvas.tokens.get(tokenId);
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

        return range(10, (this.settings.hotbarPage - 1) * 10 + 1);
    }

    private unset(slot: number) {
        delete this.userHotbar[slot];
        this.userHotbar[`-=${slot}`] = null;
    }

    private canSave(): boolean {
        return !this.settings.lockHotbar || this.user.isGM;
    }

    private hasChanges(barMacros, tokenMacros) {
        // cant make changes if you are not on the page
        if (this.currentPage != this.settings.hotbarPage) return false;
        if (barMacros.length != tokenMacros.length) return true;

        for(let i = 0; i < barMacros.length; i++) {
            if (barMacros[i].macro._id != tokenMacros[i].id)
                return true;
        }

        return false;
    }
}