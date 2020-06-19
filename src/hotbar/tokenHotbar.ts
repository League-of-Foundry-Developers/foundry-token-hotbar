import { HotbarFlags, } from '../flags/hotbarFlags';
import { Identifiable, IToken, IActor, } from '../utils/foundry';
import { Logger } from '../utils/logger';
import { FlagsStrategy, IdentityFlagsStrategy } from '../flags/flagStrategies';
import { HotbarSlots, Hotbar } from './hotbar';
import { calculatePageSlots, pickPageSlots } from './uiHotbar';

export class TokenHotbar implements Hotbar {
    constructor(
        private tokenId: string,
        private existingMacroIds: Identifiable[],
        private hotbarFlags: HotbarFlags,
        private flagKeyStrategy: FlagsStrategy,
        private logger: Logger
    ) {}

    getMacrosByPage(page: number): { hotbar: HotbarSlots; } {
        const tokenHotbars = this.hotbarFlags.get(this.tokenId);
        const flagKey = this.flagKeyStrategy.get(this.tokenId).id;
        const tokenHotbar = tokenHotbars[flagKey] || {};

        this.logger.debug('[Token Hotbar]', 'Loading', flagKey, tokenHotbar);
        
        const tokenHotbarPage = {};
        const pageSlots = calculatePageSlots(page);
        for(const slot in tokenHotbar) {
            if (!pageSlots.includes(+slot)) continue;

            const macroExists = this.existingMacroIds.some(m => m.id === tokenHotbar[slot]);
            if (macroExists) {
                tokenHotbarPage[slot] = tokenHotbar[slot];
            }
        }

        return { hotbar: tokenHotbarPage };
    }

    async setTokenMacros(page: number, data: { hotbar: HotbarSlots; }): Promise<unknown> {
        const flagKey = this.flagKeyStrategy.get(this.tokenId).id;
        const tokenHotbars = this.hotbarFlags.get(this.tokenId);
        const tokenHotbar = tokenHotbars[flagKey] || {};

        this.logger.debug('[Token Hotbar]', 'preSave', flagKey, tokenHotbars);

        const newTokenHotbar = Object.assign({}, tokenHotbar, pickPageSlots(page, data.hotbar));
        tokenHotbars[flagKey] = newTokenHotbar;

        await this.hotbarFlags.set(this.tokenId, tokenHotbars);
        this.logger.debug('[Token Hotbar]', 'Saved', flagKey, tokenHotbars);

        return true;  
    }

    removeTokenMacros(actors: Map<string, IActor>, tokens: Map<string, IToken>): Promise<unknown> {
        const flagKey = new IdentityFlagsStrategy(actors, tokens).get(this.tokenId);
        const flags = this.hotbarFlags.get(this.tokenId);
        delete flags[flagKey.id];
        return this.hotbarFlags.set(this.tokenId, flags);
    }
}