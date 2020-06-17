import { FoundryUiHotbar, CustomHotbar, FoundryHotbar, UiHotbar } from './uiHotbar';
import { Settings } from '../settings';
import { PageFlag } from '../flags/pageFlag';
import { ConsoleLogger } from '../logger';
import { Hotbar } from './hotbar';
export class UiHotbarFactory {
    constructor(private settings: Settings) { }

    public getFoundryUiObject(): FoundryUiHotbar {
        if (this.useCustomHotbar()) {
            return (<any>ui).CustomHotbar;
        }

        return (<any>ui).hotbar;
    }

    public create(): UiHotbar & Hotbar {
        if (this.useCustomHotbar()) {
            return new CustomHotbar((<any>ui).CustomHotbar);
        }
        else {
            return new FoundryHotbar(this.settings, (<any>ui).hotbar, new PageFlag(), new ConsoleLogger(this.settings));
        }
    }

    private useCustomHotbar() {
        const hasModule = Boolean((<any>game).modules.get('custom-hotbar'));
        const hasHotbar = Boolean((<any>ui).CustomHotbar);
        return hasModule && hasHotbar && this.settings.useCustomHotbar;
    }
}