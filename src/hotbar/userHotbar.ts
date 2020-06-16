import { Settings } from '../settings';
import { PageFlag } from '../flags/pageFlag';
import { Logger } from '../logger';

interface FoundryHotbar {
    page: number;
    render: (force?: boolean) => void;
}

export class UserHotbar {
    constructor(private settings: Settings, private hotbar: FoundryHotbar, private pageFlag: PageFlag, private logger: Logger = console) { }

    public goToPage(hasTokenSelected: boolean): Promise<unknown> {
        if (hasTokenSelected) {
            return this.goToTokenHotbar();
        }
        else {
            return this.goToLastActivePage();
        }
    }

    public goToTokenHotbar(): Promise<unknown> {
        if (this.hotbar.page != this.settings.hotbarPage)
            this.pageFlag.set(this.hotbar.page);

        return this.render(this.settings.hotbarPage);
    }

    public goToLastActivePage(): Promise<unknown> {
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