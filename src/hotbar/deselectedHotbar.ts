import { HotbarFlags } from '../flags/hotbarFlags';
import { Identifiable } from '../utils/foundry';
import { Logger } from '../utils/logger';
import { Hotbar, HotbarSlots } from './hotbar';
import { calculatePageSlots, pickPageSlots } from './uiHotbar';

export class DeselectedHotbar implements Hotbar {
    private readonly flagKey: 'noTokenControlled';

    constructor(
        private existingMacroIds: Identifiable[],
        private hotbarFlags: HotbarFlags,
        private logger: Logger
    ){ }

    getMacrosByPage(page: number): { hotbar: HotbarSlots; } {
        const tokenHotbars = this.hotbarFlags.get(this.flagKey);
        const tokenHotbar = tokenHotbars[this.flagKey] || {};

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
        const tokenHotbars = this.hotbarFlags.get(this.flagKey);
        const tokenHotbar = tokenHotbars[this.flagKey] || {};

        this.logger.debug('[Token Hotbar]', 'Updating Token Hotbar', page, this.flagKey, this.flagKey, data);
        const newTokenHotbar = Object.assign({}, tokenHotbar, pickPageSlots(page, data.hotbar));
        tokenHotbars[this.flagKey] = newTokenHotbar;

        await this.hotbarFlags.set(this.flagKey, tokenHotbars);

        return true;
    }

    offset(data: HotbarSlots): HotbarSlots {
        return data;
    }
}