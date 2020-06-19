import 'jasmine';
import { Settings }  from '../src/utils/settings';
import { TestClientSettings } from './helpers/TestSettings';

describe('Settings.linkToLinkedActor', () => {
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

describe('Settings.lockHotbar', () => {
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