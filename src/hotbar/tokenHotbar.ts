import { HotbarFlags, } from "../flags/hotbarFlags";
import { Notifier, Identifiable, Macro, User } from "../foundry";
import { FlagKeyStrategy, DefaultFlagKeyStrategy } from "../flags/flagKeyStrategies";

export class TokenHotbar { 
    // Dev note: not fond of this many parameters. 
    // However, from v3 (separate hotbar) on at least two will be obsolete (pages)
    constructor(
        private hotbarFlag: HotbarFlags,
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
    public load(token: Token, userHotbar: object, gameMacros: Identifiable[]) {
        const tokenHotbars = this.hotbarFlag.get(token.id);
        const flagKey = this.flagKeyStrategy.get(token.id);
        const tokenHotbar = tokenHotbars[flagKey] || [];

        if (tokenHotbar.length === 0)
            return { hasMacros: false, hotbar: userHotbar };
        
        console.debug("[Token Hotbar]", "Loading", flagKey, tokenHotbar);
        
        let hasValidMacros = false;
        for(let slot of this.getSlots()) {
            let slotMacro = tokenHotbar.find(m => m.slot == slot);
            const tokenHotbarSlotIsEmpty = !slotMacro;
            if (tokenHotbarSlotIsEmpty) {
                this.unset(userHotbar, slot);
            }
            else {
                let tokenMacro = gameMacros.find(m => m.id === slotMacro!.id);
                if (tokenMacro) {
                    userHotbar[slot] = tokenMacro.id;
                    hasValidMacros = true;
                }
                else {
                    this.unset(userHotbar, slot);
                }
            }
        }

        return { hasMacros: hasValidMacros, hotbar: userHotbar };
    }

    public remove(tokenId: string) {
        // use the default strategy, because otherwise a linked hotbar might be removed.
        const flagKey = new DefaultFlagKeyStrategy().get(tokenId);
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

    private unset(userHotbar, slot: number) {
        delete userHotbar[slot];
        userHotbar[`-=${slot}`] = null;
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