import { UiHotbar, FoundryUiHotbar, calculatePageSlots } from "./uiHotbar";
import { Hotbar, HotbarSlots } from "./hotbar";
import { PageFlag } from "../flags/pageFlag";
import { Settings } from "../settings";
import { Logger } from "../logger";

export class FoundryHotbar implements UiHotbar, Hotbar {
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
        const continuousTokenHotbar = {};
        for(let slot of calculatePageSlots(this.settings.hotbarPage)) {
            continuousTokenHotbar[slot] = data.hotbar[slot];
        }

        let macros = this.getTokenMacros()
        let combinedMacros = Object.assign(macros, continuousTokenHotbar);

        return game.user.update({ hotbar: combinedMacros });
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

    private unset(hotbar, slot: number) {
        hotbar[slot] = null;
        hotbar[`-=${slot}`] = null;
    }
}