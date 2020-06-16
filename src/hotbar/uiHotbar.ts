import { Settings } from '../settings';
import { PageFlag } from '../flags/pageFlag';
import { Logger } from '../logger';
import { Macro } from '../foundry';

export type HotbarSlots = { [slot: string] : string | null }

export interface FoundryUiHotbar {
    page: number;
    _getMacrosByPage: (page: number) => Macro[];
    render: (force?: boolean) => void;
    expand: () => Promise<unknown>;
    collapse: () => Promise<unknown>;
}

export interface UiHotbar {
    toggleHotbar(showTokenBar: boolean): Promise<unknown>;
    showTokenHotbar(): Promise<unknown>;
    hideTokenHotbar(): Promise<unknown>;
    setTokenMacros(data: { hotbar: HotbarSlots }): Promise<unknown>;
    getTokenMacros(): { hotbar: HotbarSlots };
}

export class FoundryHotbar implements UiHotbar {
    constructor(private settings: Settings, private hotbar: FoundryUiHotbar, private pageFlag: PageFlag, private logger: Logger = console) { }
    public toggleHotbar(showTokenBar: boolean): Promise<unknown> {
        if (showTokenBar) {
            return this.showTokenHotbar();
        }
        else {
            return this.hideTokenHotbar();
        }
    }

    public showTokenHotbar(): Promise<unknown> {
        if (this.hotbar.page != this.settings.hotbarPage)
            this.pageFlag.set(this.hotbar.page);

        return this.render(this.settings.hotbarPage);
    }

    public hideTokenHotbar(): Promise<unknown> {
        if (this.hotbar.page != this.settings.hotbarPage)
            return Promise.resolve(); // user already moved away from the token hotbar.

        return this.render(this.pageFlag.get());
    }

    public getTokenMacros() {
        return <{ hotbar: HotbarSlots }><unknown>game.user.data;
    }

    setTokenMacros(data: { hotbar: HotbarSlots }): Promise<unknown> {
        return game.user.update({ hotbar: data.hotbar });
    }

    private render(page: number): Promise<unknown> {
        this.hotbar.page = page;
        return new Promise((resolve) => {
        // FIXME: Render does not always work without the timeout.
            setTimeout(() => {
                this.hotbar.render();
                this.logger.debug('[Token Hotbar]', 'rendered page', page);
                resolve();
            }, 5);
        });
    }
}

export class CustomHotbar implements UiHotbar {
    constructor(private hotbar: FoundryUiHotbar) { }
    setTokenMacros(data: { hotbar: HotbarSlots }): Promise<unknown> {
        return (<any>window).chbSetMacros(data.hotbar);
    }
    getTokenMacros(): { hotbar: HotbarSlots } {
        return { hotbar: (<any>window).chbGetMacros() };
    }

    toggleHotbar(showTokenBar: boolean): Promise<unknown> {
        return showTokenBar || canvas.tokens.controlled.length === 1 ? this.showTokenHotbar() : this.hideTokenHotbar();
    }
    showTokenHotbar(): Promise<unknown> {
        return this.hotbar.expand();
    }
    hideTokenHotbar(): Promise<unknown> {
        return this.hotbar.collapse();
    }

}