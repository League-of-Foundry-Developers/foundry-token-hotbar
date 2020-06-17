import { HotbarFlags, } from '../flags/hotbarFlags';
import { Identifiable, IToken, IActor, } from '../foundry';
import { Logger } from '../logger';
import { FlagsStrategy, IdentityFlagsStrategy } from '../flags/flagStrategies';
import { HotbarSlots, Hotbar } from './hotbar';
import { Settings } from '../settings';
import { calculatePageSlots } from './uiHotbar';

export class TokenHotbar implements Hotbar {
    constructor(
        private tokenId: string,
        private existingMacroIds: Identifiable[],
        private hotbarFlags: HotbarFlags,
        private flagKeyStrategy: FlagsStrategy,
        private settings: Settings,
        private logger: Logger
    ) {}

    getTokenMacros(): { hotbar: HotbarSlots; } {
        const tokenHotbars = this.hotbarFlags.get(this.tokenId);
        const flagKey = this.flagKeyStrategy.get(this.tokenId).id;
        const tokenHotbar = tokenHotbars[flagKey] || [];

        this.logger.debug('[Token Hotbar]', 'Loading', flagKey, tokenHotbar);
        
        const tokenHotbarPage = {};
        for(const slot in tokenHotbar) {
            const slotMacro = tokenHotbar[slot];
            const tokenMacro = this.existingMacroIds.find(m => m.id === slotMacro);
            if (tokenMacro) {
                tokenHotbarPage[slot] = tokenMacro.id;
            }
        }

        return { hotbar: tokenHotbarPage };
    }

    // TODO: TokenHotbar should return whatever page is request by ui hotbar.
    // But what for normal hotbar? Logic in main seems ugly...
    // First ask ui hotbar for page, then load token bar into ui hotbar.
    // Why again not return / set everything? Make UI responsible for updating the right ones?
    // But then when to update?
    async setTokenMacros(data: { hotbar: HotbarSlots; }): Promise<unknown> {
        const slots = calculatePageSlots(this.settings.hotbarPage);
        const flagKey = this.flagKeyStrategy.get(this.tokenId).id;
        const tokenHotbars = this.hotbarFlags.get(this.tokenId);
        const tokenHotbar = tokenHotbars[flagKey] || {};

        if (!this.hasChanges(data.hotbar, tokenHotbar)) return false;

        this.logger.debug('[Token Hotbar]', 'preSave', flagKey, tokenHotbars);

        for(let slot of slots) {
            tokenHotbar[slot] = data.hotbar[slot];
        }

        tokenHotbars[flagKey] = tokenHotbar;

        await this.hotbarFlags.set(this.tokenId, tokenHotbars);
        this.logger.debug('[Token Hotbar]', 'Saving', flagKey, tokenHotbars);

        return true;  
    }

    removeTokenMacros(actors: Map<string, IActor>, tokens: Map<string, IToken>) {
        const flagKey = new IdentityFlagsStrategy(actors, tokens).get(this.tokenId);
        const flags = this.hotbarFlags.get(this.tokenId);
        delete flags[flagKey.id];
        return this.hotbarFlags.set(this.tokenId, flags);
    }

    private hasChanges(newMacros: HotbarSlots, oldMacros: HotbarSlots) {
        if (Object.keys(newMacros).length !== Object.keys(oldMacros).length) {
            return true;
        }

        return Object.keys(newMacros).every(key => newMacros[key] === oldMacros[key]);
    }
}
