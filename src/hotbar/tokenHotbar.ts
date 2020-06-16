import { HotbarFlags, } from '../flags/hotbarFlags';
import { Notifier, Identifiable, Macro, IToken, IActor, Flaggable } from '../foundry';
import { Logger } from '../logger';
import { FlagsStrategy, IdentityFlagsStrategy } from '../flags/flagStrategies';

export class TokenHotbar { 
    // Dev note: not fond of this many parameters. 
    // However, from v3 (separate hotbar) on at least two will be obsolete (pages)
    constructor(
        private hotbarFlag: HotbarFlags,
        private notifier: Notifier,
        private hotbarPage: number,
        private flagKeyStrategy: FlagsStrategy,
        private logger: Logger = console) { }

    public async save(token: Identifiable, macrosToSave: Macro[], canSave: boolean): Promise<boolean> {
        const slots = this.getSlots();
        macrosToSave = macrosToSave.filter(m => m.macro && slots.includes(m.slot));
        const flagKey = this.flagKeyStrategy.get(token.id);

        const tokenHotbars = this.hotbarFlag.get(token.id);
        const tokenHotbar = tokenHotbars[flagKey.id] || [];

        // FIXME: this seems very inefficient
        //        will become unnecessary in v3.0.0
        //        ! Will be unnecessary to fix in v3.0.0 (separate hotbar, all pages/slots will be relevant)
        if (!this.hasChanges(macrosToSave, tokenHotbar)) return false;
        if (!canSave) {
            this.notifier.warn('The token hotbar is locked for players. Any macros placed on this page will be replaced.');
            return false;
        }

        this.logger.debug('[Token Hotbar]', 'preSave', flagKey, tokenHotbars);

        tokenHotbars[flagKey.id] =
            macrosToSave.map(item => { 
                return { slot: item.slot, id: item.macro.id };
            });

        this.logger.debug('[Token Hotbar]', 'Saving', flagKey, tokenHotbars);

        await this.hotbarFlag.set(token.id, tokenHotbars);
        return true;
    }
    
    // Returns true if the token has macros on the token hotbar
    //         otherwise false
    public load(token: IToken, userHotbar: { [slot: number]: string }, gameMacros: Identifiable[]): { hasMacros: boolean, hotbar: unknown } {
        const tokenHotbars = this.hotbarFlag.get(token.id);
        const flagKey = this.flagKeyStrategy.get(token.id);
        const tokenHotbar = tokenHotbars[flagKey.id] || [];

        if (tokenHotbar.length === 0)
            return { hasMacros: false, hotbar: userHotbar };
        
        this.logger.debug('[Token Hotbar]', 'Loading', flagKey, tokenHotbar);
        
        let hasValidMacros = false;
        for(const slot of this.getSlots()) {
            const slotMacro = tokenHotbar.find(m => m.slot == slot);
            if (!slotMacro) {
                this.unset(userHotbar, slot);
            }
            else {
                const tokenMacro = gameMacros.find(m => m.id === slotMacro.id);
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

    public remove(tokenId: string, actors: Map<string, IActor>, tokens: Map<string, IToken>): Promise<Flaggable> {
        // use the default strategy, because otherwise a linked hotbar might be removed.
        // FIXME: ideally this should not be hard coded in here
        const flagKey = new IdentityFlagsStrategy(actors, tokens).get(tokenId);
        const flags = this.hotbarFlag.get(tokenId);
        delete flags[flagKey.id];
        return this.hotbarFlag.set(tokenId, flags);
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
        this.logger.debug('[Token Hotbar]', 'Comparing', barMacros, tokenMacros);
        // cant make changes if you are not on the page
        if (barMacros.length != tokenMacros.length) return true;

        for(let i = 0; i < barMacros.length; i++) {
            if (barMacros[i].slot != tokenMacros[i].slot)
                return true;
                
            if (barMacros[i].macro._id != tokenMacros[i].id)
                return true;
        }

        return false;
    }
}