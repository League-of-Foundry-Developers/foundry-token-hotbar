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

    static keys = {
        alwaysLinkToActor: 'linkToActor',
        linkToLinkedActor: 'link',
        hotbarPage: 'page',
        shareHotbar: 'share',
        lockHotbar: 'lock'
    }

    public load(s: ClientSettingsReader) : Settings {
        this.hotbarPage = this.getSetting(s, Settings.keys.hotbarPage);

        this.alwaysLinkToActor = this.getSetting(s, Settings.keys.alwaysLinkToActor);
        this.linkToLinkedActor = this.getSetting(s, Settings.keys.linkToLinkedActor) || this.alwaysLinkToActor;

        this.shareHotbar = this.getSetting(s, Settings.keys.shareHotbar);
        this.lockHotbar = this.getSetting(s, Settings.keys.lockHotbar) && this.shareHotbar;
    
        return this;
    }

    private getSetting(settings: ClientSettingsReader, key: string) {
        return settings.get(CONSTANTS.moduleName, key);
    }
}