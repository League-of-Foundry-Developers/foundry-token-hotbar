import { CONSTANTS } from './constants';

export interface ClientSettingsReader {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(scope: string, key: string): any;
}

export class Settings {
    alwaysLinkToActor: boolean;
    linkToLinkedActor: boolean;
    hotbarPage: number;
    shareHotbar: boolean;
    lockHotbar: boolean;
    debugMode: boolean;
    useCustomHotbar: boolean;

    static keys = {
        alwaysLinkToActor: 'linkToActor',
        linkToLinkedActor: 'link',
        hotbarPage: 'page',
        shareHotbar: 'share',
        lockHotbar: 'lock',
        debugMode: 'debug',
        useCustomHotbar: 'customHotbar'
    }

    public load(s: ClientSettingsReader) : Settings {
        // TODO V3: remove the page override as soon as the logic is fixed. 
        this.useCustomHotbar = this.getSetting(s, Settings.keys.useCustomHotbar);
        this.hotbarPage = this.useCustomHotbar ? 1 : this.getSetting(s, Settings.keys.hotbarPage);

        this.alwaysLinkToActor = this.getSetting(s, Settings.keys.alwaysLinkToActor);
        this.linkToLinkedActor = this.getSetting(s, Settings.keys.linkToLinkedActor) || this.alwaysLinkToActor;

        this.shareHotbar = this.getSetting(s, Settings.keys.shareHotbar);
        this.lockHotbar = this.getSetting(s, Settings.keys.lockHotbar) && this.shareHotbar;

        this.debugMode = this.getSetting(s, Settings.keys.debugMode);


        return this;
    }

    /**
     * Helper method to quickly construct Settings from game.settings
     */
    static _load(): Settings { return new Settings().load(game.settings); }

    private getSetting(settings: ClientSettingsReader, key: string) {
        return settings.get(CONSTANTS.moduleName, key);
    }
}