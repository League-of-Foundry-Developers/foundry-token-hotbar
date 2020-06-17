import { Settings } from "../settings";
import { UiHotbar, FoundryUiHotbar, calculatePageSlots } from "./uiHotbar";
import { Hotbar, HotbarSlots } from "./hotbar";

export class CustomHotbar implements UiHotbar, Hotbar {
    constructor(protected settings: Settings, private hotbar: FoundryUiHotbar) { }

    toggleHotbar(showTokenBar: boolean): Promise<unknown> {
        return showTokenBar || canvas.tokens.controlled.length === 1 ? this.showTokenHotbar() : this.hideTokenHotbar();
    }

    showTokenHotbar(): Promise<unknown> {
        return this.hotbar.expand();
    }

    hideTokenHotbar(): Promise<unknown> {
        return this.hotbar.collapse();
    }

    getTokenMacros(): { hotbar: HotbarSlots } {
        return { hotbar: (<any>window).chbGetMacros() };
    }

    setTokenMacros(data: { hotbar: HotbarSlots }): Promise<unknown> {
        return (<any>window).chbSetMacros(data.hotbar);
    }
}

export class SinglePageCustomHotbar extends CustomHotbar {
    getTokenMacros(): { hotbar: HotbarSlots } {
        const data = super.getTokenMacros();
        const offset = this.calculatePageOffset();

        const offsetSlots = {};
        for(let slot in data.hotbar) {
            offsetSlots[+slot + offset] = data.hotbar[slot];
        }

        return { hotbar: offsetSlots };
    }

    setTokenMacros(data: { hotbar: HotbarSlots }): Promise<unknown> {
        const offset = this.calculatePageOffset();

        const offsetSlots = {};
        for(let slot of calculatePageSlots(1)) {
            offsetSlots[slot] = data.hotbar[slot + offset];
        }

        return super.setTokenMacros({ hotbar: offsetSlots });
    }

    /**
     * Because all macros are on page one, if the settings use page five the offset should be 40
     * So that token macros 41-50 go on slots 1-10 of the custom hotbar.
     * @returns the positive offset of the page slots of the token bar and slots 1-10
     */
    private calculatePageOffset(): number {
        return this.settings.hotbarPage * 10 - 10;
    }
}