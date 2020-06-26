import 'jasmine';
import { Settings }  from '../src/utils/settings';
import { TestClientSettings } from './helpers/TestSettings';

describe('Settings.linkToLinkedActor', () => {
    it('should be true when linkToLinkedActor is true', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.linkToLinkedActor] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings), false);

        expect(settings.linkToLinkedActor).toBeTrue();
    });

    it('should be true when alwaysLinkToActor is true', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.alwaysLinkToActor] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings), false);

        expect(settings.alwaysLinkToActor).toBeTrue();
    });
});


describe('Settings.useCustomHotbar', () => {
    it('should be true when the settings is true and the module is enabled', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.useCustomHotbar] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings), true);

        expect(settings.useCustomHotbar).toBeTrue();
    });

    it('should be false when the settings is true and the module is disabled', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.useCustomHotbar] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings), false);

        expect(settings.useCustomHotbar).toBeFalse();
    });

    it('should be false when the settings is false and the module is enabled', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.useCustomHotbar] = false;
        const settings = new Settings().load(new TestClientSettings(clientSettings), true);

        expect(settings.useCustomHotbar).toBeFalse();
    });
});

describe('Settings.lockHotbar', () => {
    it('should be true when lockHotbar and shareHotbar are true', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.lockHotbar] = true;
        clientSettings[Settings.keys.shareHotbar] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings), false);

        expect(settings.lockHotbar).toBeTrue();
    });

    it('should be false when lockHotbar is false', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.lockHotbar] = false;
        clientSettings[Settings.keys.shareHotbar] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings), false);

        expect(settings.lockHotbar).toBeFalse();
    });

    it('should be false when shareHotbar is false', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.lockHotbar] = true;
        clientSettings[Settings.keys.shareHotbar] = false;
        const settings = new Settings().load(new TestClientSettings(clientSettings), false);

        expect(settings.lockHotbar).toBeFalse();
    });
});