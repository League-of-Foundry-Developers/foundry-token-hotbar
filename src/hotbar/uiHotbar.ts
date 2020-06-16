import { Settings } from '../settings';
import { PageFlag } from '../flags/pageFlag';
import { Logger } from '../logger';
import { Macro } from '../foundry';

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
    setTokenMacros(data: { hotbar: { [ slot: number]: string }}): Promise<unknown>;
    getTokenMacros(): { hotbar: { [slot: number]: string } };
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
        return <{ hotbar: { [slot: number]: string } }><unknown>game.user.data;
    }

    setTokenMacros(data: { hotbar: { [slot: number]: string; }; }): Promise<unknown> {
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
    setTokenMacros(data: { hotbar: { [slot: number]: string; }; }): Promise<unknown> {
        return (<any>window).chbSetMacros(data.hotbar);
    }
    getTokenMacros(): { hotbar: { [slot: number]: string; } } {
        return { hotbar: (<any>window).chbGetMacros() };
    }

    toggleHotbar(showTokenBar: boolean): Promise<unknown> {
        return showTokenBar ? this.showTokenHotbar() : this.hideTokenHotbar();
    }
    showTokenHotbar(): Promise<unknown> {
        return this.hotbar.expand();
    }
    hideTokenHotbar(): Promise<unknown> {
        return this.hotbar.collapse();
    }

}