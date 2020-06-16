import { Settings } from '../settings';
import { PageFlag } from '../flags/pageFlag';
import { Logger } from '../logger';

interface FoundryUiHotbar {
    page: number;
    render: (force?: boolean) => void;
    expand: () => Promise<unknown>;
    collapse: () => Promise<unknown>;
}

export interface UiHotbar {
    toggleHotbar(showTokenBar: boolean): Promise<unknown>;
    showTokenHotbar(): Promise<unknown>;
    hideTokenHotbar(): Promise<unknown>;
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