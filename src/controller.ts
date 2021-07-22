import { UiHotbar, calculatePageSlots } from './hotbar/uiHotbar';
import { Hotbar, HotbarSlots, HotbarSlot } from './hotbar/hotbar';
import { Settings } from './utils/settings';
import { IToken, User, Socket } from './utils/foundry';
import { Logger, ConsoleLogger } from './utils/logger';
import { UiHotbarFactory } from './hotbar/uiHotbarFactory';
import { TokenHotbarFactory } from './hotbar/tokenHotbarFactory';

export interface UpdateMsg {
    userId: string;
    tokenId: string;
    type: 'updateTokenHotbar'
}

export class TokenHotbarController {
    constructor(private settings: Settings, private uiHotbar: UiHotbar & Hotbar, private socket: Socket, private tokenHotbar: Hotbar, private logger: Logger) { }

    async save(user: User, tokenId: string | undefined, hotbarUpdate: HotbarSlots): Promise<void> {
        if (!this.uiHotbar.onTokenHotbarPage())
            return;

        const updates = this.transformHotbarUpdate(hotbarUpdate);
        const hotbarPage = this.uiHotbar.getTokenHotbarPage();

        const oldHotbarMacros = this.uiHotbar.getMacrosByPage(hotbarPage);
        const combinedMacros = Object.assign({}, oldHotbarMacros.hotbar, this.uiHotbar.offset(updates));

        const tokenMacros = this.tokenHotbar.getMacrosByPage(hotbarPage);

        if (this.hasChanges(hotbarPage, combinedMacros, tokenMacros.hotbar)) {
            if (!this.settings.lockHotbar || user.isGM) {
                this.logger.debug('[Token Hotbar]', 'Applying update', hotbarPage, hotbarUpdate, updates);
                await this.tokenHotbar.setTokenMacros(hotbarPage, { hotbar: combinedMacros });
                if (tokenId) this.triggerReload(user, tokenId);
            } else
                ui.notifications.warn(game.i18n.localize('TokenHotbar.notifications.lockedWarning'));
        }
    }

    private triggerReload(user: User, tokenId: string) {
        const msg: UpdateMsg = {
            type: 'updateTokenHotbar',
            userId: user.id,
            tokenId: tokenId
        };
        this.socket.emit('module.TokenHotbar', msg);
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
        const tokenMacros = this.tokenHotbar.getMacrosByPage(hotbarPage);

        await this.uiHotbar.setTokenMacros(hotbarPage, tokenMacros);

        this.logger.debug('[Token Hotbar]', 'Rendering Hotbar', tokenMacros.hotbar);

        const macros = Object.values(tokenMacros.hotbar);
        this.uiHotbar.toggleHotbar(macros.length > 0 && macros.every(macro => !!macro));
    }

    private hasChanges(page: number, macros: HotbarSlots, tokenMacros: HotbarSlots) {
        const slots = calculatePageSlots(page);
        return slots.some(slot => macros[slot] != tokenMacros[slot]);
    }

    /**
     * Transforms `-=<slot>` keys into `<slot>`
     * This method may be unnecessary?
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

export class ControllerFactory {
    constructor(private settings: Settings) {}

    create(token?: IToken): TokenHotbarController {
        return new TokenHotbarController(
            this.settings,
            new UiHotbarFactory(this.settings).create(),
            <Socket><unknown>game.socket,
            new TokenHotbarFactory(this.settings).create(token?.id),
            new ConsoleLogger(this.settings));
    }
}