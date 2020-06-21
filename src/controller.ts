import { TokenHotbar } from './hotbar/tokenHotbar';
import { UiHotbar, calculatePageSlots } from './hotbar/uiHotbar';
import { Hotbar, HotbarSlots } from './hotbar/hotbar';
import { Settings } from './utils/settings';
import { IToken, User } from './utils/foundry';
import { Logger } from './utils/logger';

export class TokenHotbarController {
    constructor(private settings: Settings, private uiHotbar: UiHotbar & Hotbar, private tokenHotbar: TokenHotbar, private logger: Logger) { }

    async save(user: User, token: IToken, hotbarUpdate: HotbarSlots): Promise<void> { 
        if (this.uiHotbar.shouldUpdateTokenHotbar()) {
            const hotbarPage = this.uiHotbar.getTokenHotbarPage();
            const oldHotbarMacros = this.uiHotbar.getMacrosByPage(hotbarPage);
            const updates = this.transformHotbarUpdate(hotbarUpdate);
            const macros = Object.assign({}, oldHotbarMacros.hotbar, updates);
            const tokenMacros = this.tokenHotbar.getMacrosByPage(hotbarPage);

            if (this.hasChanges(hotbarPage, macros, tokenMacros.hotbar)) {
                if (!this.settings.lockHotbar || user.isGM) {
                    this.logger.debug('[Token Hotbar]', 'Applying update', hotbarPage, hotbarUpdate, updates);
                    await this.tokenHotbar.setTokenMacros(hotbarPage, { hotbar: macros });
                } else
                    ui.notifications.warn(game.i18n.localize('TokenHotbar.notifications.lockedWarning'));
            }
        }
    }

    async reload(): Promise<void> {
        const hotbarPage = this.uiHotbar.getTokenHotbarPage();
        if (this.uiHotbar.currentPage() != hotbarPage)
            return;

        const tokenHotbarMacros = this.tokenHotbar.getMacrosByPage(hotbarPage);
        const uiHotbarMacros = this.uiHotbar.getMacrosByPage(hotbarPage);
        if (!this.hasChanges(hotbarPage, tokenHotbarMacros.hotbar, uiHotbarMacros.hotbar))
            return;

        return this.load();
    }

    async load(): Promise<void> {
        const hotbarPage = this.uiHotbar.getTokenHotbarPage();
        const result = this.tokenHotbar.getMacrosByPage(hotbarPage);

        await this.uiHotbar.setTokenMacros(hotbarPage, result);

        this.logger.debug('[Token Hotbar]', 'Rendering Hotbar', hotbarPage, result.hotbar);

        const macros = Object.values(result.hotbar);
        this.uiHotbar.toggleHotbar(macros.length > 0 && macros.every(macro => !!macro));
    }

    hide(): void {
        this.uiHotbar.toggleHotbar(false);
        this.logger.debug('[Token Hotbar]', 'No or multiple controlled tokens');
    }

    private hasChanges(page: number, macros: HotbarSlots, tokenMacros: HotbarSlots) {
        const slots = calculatePageSlots(page);
        return slots.some(slot => macros[slot] != tokenMacros[slot]);
    }

    /**
     * Transforms `-=<slot>` keys into `<slot>`
     * @param hotbarUpdate 
     */
    private transformHotbarUpdate(hotbarUpdate: HotbarSlots) {
        return Object.keys(hotbarUpdate).reduce<HotbarSlots>((update, key) => {
            if (isNaN(+key)) {
                update[key.substring(2)] = hotbarUpdate[key];
            } else {
                update[key] = hotbarUpdate[key];
            }
            return update;
        }, {});
    }
}