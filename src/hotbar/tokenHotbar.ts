import { HotbarFlags, } from "../flags/hotbarFlags";
import { Notifier, Identifiable, Macro, User } from "../foundry";
import { FlagKeyStrategy } from "../flags/flagKeyStrategies";

export class TokenHotbar { 
    private userHotbar: { [slot: string ]: string | null }

    constructor(
        private hotbarFlag: HotbarFlags,
        private user: User,
        private notifier: Notifier,
        private currentPage: number,
        private hotbarPage: number,
        private flagKeyStrategy: FlagKeyStrategy) { }

    public save(token: Identifiable, macrosToSave: Macro[], canSave: boolean) {
        if (this.currentPage != this.hotbarPage) return false;

        const slots = this.getSlots();
        macrosToSave = macrosToSave.filter(m => m.macro && slots.includes(m.slot));
        const flagKey = this.flagKeyStrategy.get(token.id);
        let tokenMacros = this.hotbarFlag.get(token.id)[flagKey] || [];

        // FIXME: this seems very inefficient
        //        will become unnecessary in v3.0.0
        //        ! Will be unnecessary to fix in v3.0.0 (separate hotbar, all pages/slots will be relevant)
        if (!this.hasChanges(macrosToSave, tokenMacros)) return false;
        if (!canSave) {
            this.notifier.warn("The token hotbar is locked for players. Any macros placed on this page will be replaced.")
            return false;
        }

        let tokenBars = this.hotbarFlag.get(token.id);

        tokenBars[flagKey] = macrosToSave
            .map(item => { 
                return {
                    slot: item.slot,
                    id: item.macro.id
                }
            });

        console.debug("[Token Hotbar]", "Saving", flagKey, tokenBars);

        this.hotbarFlag.set(token.id, tokenBars);
        return true;
    }

    // Returns true if the token has macros on the token hotbar
    //         otherwise false
    public load(token: Token, userHotbar: { [slot: number]: string }, gameMacros: Identifiable[]) {
        this.userHotbar = userHotbar;
        
        const tokenHotbars = this.hotbarFlag.get(token.id);
        const flagKey = this.flagKeyStrategy.get(token.id);
        const tokenHotbar = tokenHotbars[flagKey] || [];

        if (tokenHotbar.length === 0)
            return Promise.resolve(false);        
        
        console.debug("[Token Hotbar]", "Loading", flagKey, tokenHotbar);
        
        let hasValidMacros = false;
        for(let slot of this.getSlots()) {
            let slotMacro = tokenHotbar.find(m => m.slot == slot);
            const tokenHotbarSlotIsEmpty = !slotMacro;
            if (tokenHotbarSlotIsEmpty) {
                this.unset(slot);
            }
            else {
                let tokenMacro = gameMacros.find(m => m.id === slotMacro!.id);
                if (tokenMacro) {
                    this.userHotbar[slot] = tokenMacro.id;
                    hasValidMacros = true;
                }
                else {
                    this.unset(slot);
                }
            }
        }
        return this.user.update({ hotbar: this.userHotbar })
            .then(() => hasValidMacros);
    }

    public remove(tokenId: string) {
        const flagKey = this.flagKeyStrategy.get(tokenId);
        const flags = this.hotbarFlag.get(tokenId);
        delete flags[flagKey];
        this.hotbarFlag.set(tokenId, flags);
    }

    private getSlots() {
        function range(size: number, startAt = 0) {
            return [...Array(size).keys()].map(i => i + startAt);
        }

        return range(10, (this.hotbarPage - 1) * 10 + 1);
    }

    private unset(slot: number) {
        delete this.userHotbar[slot];
        this.userHotbar[`-=${slot}`] = null;
    }

    private hasChanges(barMacros, tokenMacros) {
        // cant make changes if you are not on the page
        if (this.currentPage != this.hotbarPage) return false;
        if (barMacros.length != tokenMacros.length) return true;

        for(let i = 0; i < barMacros.length; i++) {
            if (barMacros[i].macro._id != tokenMacros[i].id)
                return true;
        }

        return false;
    }
}