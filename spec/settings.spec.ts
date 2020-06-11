import 'jasmine';
import { Settings }  from '../src/settings';

class TestClientSettings {
    constructor(private settings: {[key: string]: any }) { }
    public get(scope: string, key: string) {
        return this.settings[key];
    }
}

describe('linkToLinkedActor', () => {
    it('should be true when linkToLinkedActor is true', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.linkToLinkedActor] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings));

        expect(settings.linkToLinkedActor).toBeTrue();
    });

    it('should be true when alwaysLinkToActor is true', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.alwaysLinkToActor] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings));

        expect(settings.alwaysLinkToActor).toBeTrue();
    });
});

describe('lockHotbar', () => {
    it('should be true when lockHotbar and shareHotbar are true', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.lockHotbar] = true;
        clientSettings[Settings.keys.shareHotbar] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings));

        expect(settings.lockHotbar).toBeTrue();
    });

    it('should be false when lockHotbar is false', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.lockHotbar] = false;
        clientSettings[Settings.keys.shareHotbar] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings));

        expect(settings.lockHotbar).toBeFalse();
    });

    it('should be false when shareHotbar is false', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.lockHotbar] = true;
        clientSettings[Settings.keys.shareHotbar] = false;
        const settings = new Settings().load(new TestClientSettings(clientSettings));

        expect(settings.lockHotbar).toBeFalse();
    });
});