import { Settings } from './settings';
import { PageFlag } from './pageFlag';

interface FoundryHotbar {
    page: number;
    render: (force?: boolean) => void;
}

export class UserHotbar {
    constructor(private settings: Settings, private hotbar: FoundryHotbar, private pageFlag: PageFlag) { }

    public goToPage(hasTokenSelected: boolean) {
        if (hasTokenSelected) {
            this.goToTokenHotbar();
        }
        else {
            this.goToLastActivePage();
        }
    }

    public goToTokenHotbar() {
        if (this.hotbar.page != this.settings.hotbarPage)
            this.pageFlag.set(this.hotbar.page);

        this.render(this.settings.hotbarPage);
    }

    public goToLastActivePage() {
        if (this.hotbar.page != this.settings.hotbarPage)
            return; // user already moved away from the token hotbar.

        this.render(this.pageFlag.get());
    }

    private render(page: number) {
        this.hotbar.page = page;
        // FIXME: Render does not always work without the timeout.
        setTimeout(() => this.hotbar.render(true), 50);
        // this.hotbar.render(true);
    }

}