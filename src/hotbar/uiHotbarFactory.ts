import { UiHotbar } from './uiHotbar';
import { Settings } from '../settings';
import { PageFlag } from '../flags/pageFlag';
import { ConsoleLogger } from '../logger';
import { Hotbar } from './hotbar';
import { SinglePageCustomHotbar } from './customHotbar';
import { FoundryHotbar } from './foundryHotbar';
import { FoundryUiHotbar } from '../foundry';
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
            return new SinglePageCustomHotbar(this.settings, (<any>ui).CustomHotbar);
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