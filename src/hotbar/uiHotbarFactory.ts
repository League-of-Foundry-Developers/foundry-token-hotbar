/* eslint-disable @typescript-eslint/no-explicit-any */
import { UiHotbar } from './uiHotbar';
import { Settings } from '../utils/settings';
import { PageFlag } from '../flags/pageFlag';
import { ConsoleLogger } from '../utils/logger';
import { Hotbar } from './hotbar';
import { SinglePageCustomHotbar } from './customHotbar';
import { FoundryHotbar } from './foundryHotbar';
import { FoundryUiHotbar } from '../utils/foundry';
export class UiHotbarFactory {
    constructor(private settings: Settings) { }

    public getFoundryUiObject(): FoundryUiHotbar {
        if (this.settings.useCustomHotbar) {
            return (<any>ui).CustomHotbar;
        }

        return (<any>ui).hotbar;
    }

    public create(): UiHotbar & Hotbar {
        const logger = new ConsoleLogger(this.settings);
        if (this.settings.useCustomHotbar) {
            return new SinglePageCustomHotbar(this.settings, (<any>ui).CustomHotbar, logger);
        } else {
            return new FoundryHotbar(this.settings, (<any>ui).hotbar, new PageFlag(), logger);
        }
    }
}