/* eslint-disable @typescript-eslint/no-explicit-any */
import { Settings } from '../utils/settings';
import { UiHotbar, calculatePageSlots, pickPageSlots } from './uiHotbar';
import { Hotbar, HotbarSlots } from './hotbar';
import { FoundryUiHotbar } from '../utils/foundry';
import { Logger } from '../utils/logger';

export class CustomHotbar implements UiHotbar, Hotbar {
    constructor(
        protected settings: Settings,
        private hotbar: FoundryUiHotbar,
        protected logger: Logger) { }

    toggleHotbar(showTokenBar: boolean): Promise<unknown> {
        return showTokenBar || canvas.tokens.controlled.length === 1 ? this.showTokenHotbar() : this.hideTokenHotbar();
    }

    shouldUpdateTokenHotbar(): boolean {
        return this.hotbar.page == this.getTokenHotbarPage();
    }

    getTokenHotbarPage(): number {
        return this.hotbar.page;
    }

    showTokenHotbar(): Promise<unknown> {
        return this.hotbar.expand();
    }

    hideTokenHotbar(): Promise<unknown> {
        return this.hotbar.collapse();
    }

    getMacrosByPage(page: number): { hotbar: HotbarSlots } {
        const allSlots =  (<any>window).chbGetMacros();
        const pageSlots = pickPageSlots(page, allSlots);
        return { hotbar: pageSlots };
    }

    setTokenMacros(page: number, data: { hotbar: HotbarSlots }): Promise<unknown> {
        this.logger.debug('[Token Hotbar]', 'Updating Custom Hotbar', page, data);
        const continuousTokenHotbar = pickPageSlots(page, data.hotbar);
        const allSlots = this.getAllHotbarMacros();
        const combinedMacros = Object.assign({}, allSlots, continuousTokenHotbar);

        return (<any>window).chbSetMacros(combinedMacros);
    }

    currentPage(): number {
        return this.hotbar.page;
    }

    private getAllHotbarMacros(): HotbarSlots {
        return (<any>window).chbGetMacros();
    }
}

export class SinglePageCustomHotbar extends CustomHotbar {
    shouldUpdateTokenHotbar(): boolean {
        return true;
    }

    getTokenHotbarPage(): number {
        // technically the page is 1, but we mimic placing token macros on the core hotbar
        // so that when Norc's Custom Hotbar is turned off, we see the tokens on the core hotbar.
        return this.settings.hotbarPage;
    }

    getMacrosByPage(page: number): { hotbar: HotbarSlots } {
        page = 1;
        const data = super.getMacrosByPage(page); //only one page with macros
        const offset = this.calculatePageOffset();

        const offsetSlots = {};
        for(const slot in data.hotbar) {
            offsetSlots[+slot + offset] = data.hotbar[slot];
        }

        return { hotbar: offsetSlots };
    }

    setTokenMacros(page: number, data: { hotbar: HotbarSlots }): Promise<unknown> {
        this.logger.debug('[Token Hotbar]', 'Updating Custom Hotbar', page, data);
        const offset = this.calculatePageOffset();

        const offsetSlots = {};
        for(const slot of calculatePageSlots(1)) {
            offsetSlots[slot] = data.hotbar[slot + offset];
        }

        return (<any>window).chbSetMacros(offsetSlots);
    }

    currentPage(): number {
        return this.getTokenHotbarPage(); // single page, mimicking the token hotbar page
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