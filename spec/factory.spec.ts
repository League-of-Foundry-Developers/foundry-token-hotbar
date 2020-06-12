import 'jasmine';
import { Settings }  from '../src/settings';
import { SharedFlagKeyStrategy, AlwaysLinkedFlagKeyStrategy, LinkedFlagKeyStrategy } from '../src/flags/flagKeyStrategies';
import { FlagKeyFactory, FlagStrategyFactory } from '../src/flags/factory';
import { SharedLinkedFlagsStrategy, SharedAlwaysLinkedFlagsStrategy, DefaultFlagsStrategy } from '../src/flags/flagStrategies';

class TestClientSettings {
    constructor(private settings: {[key: string]: any }) { }
    public get(_: string, key: string) {
        return this.settings[key];
    }
}

describe('FlagKeyStrategyFactory', () => {
    it('should return LinkedFlagKeyStrategy if hotbar is linked to actor.', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.linkToLinkedActor] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings));

        expect(new FlagKeyFactory(settings).create()).toBeInstanceOf(LinkedFlagKeyStrategy);
    });

    it('should return AlwaysLinkedFlagKeyStrategy if hotbar is linked to actor.', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.linkToLinkedActor] = true;
        clientSettings[Settings.keys.alwaysLinkToActor] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings));

        expect(new FlagKeyFactory(settings).create()).toBeInstanceOf(AlwaysLinkedFlagKeyStrategy);
    });

    it('should return SharedFlagKeyStrategy if hotbar is shared', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.shareHotbar] = true;
        clientSettings[Settings.keys.linkToLinkedActor] = true;
        clientSettings[Settings.keys.alwaysLinkToActor] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings));

        expect(new FlagKeyFactory(settings).create()).toBeInstanceOf(SharedFlagKeyStrategy);
    });

});

describe('FlagStrategyFactory', () => {
    it('should return SharedLinkFlagsStrategy if hotbar is shared and linked to actor.', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.linkToLinkedActor] = true;
        clientSettings[Settings.keys.shareHotbar] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings));

        expect(new FlagStrategyFactory(settings).create()).toBeInstanceOf(SharedLinkedFlagsStrategy);
    });

    it('should return SharedAlwaysLinkedFlagsStrategy if hotbar is shared and linked to actor.', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.shareHotbar] = true;
        clientSettings[Settings.keys.linkToLinkedActor] = true;
        clientSettings[Settings.keys.alwaysLinkToActor] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings));

        expect(new FlagStrategyFactory(settings).create()).toBeInstanceOf(SharedAlwaysLinkedFlagsStrategy);
    });

    it('should return DefaultFlagsStrategy if hotbar is not shared', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.shareHotbar] = false;
        clientSettings[Settings.keys.linkToLinkedActor] = true;
        clientSettings[Settings.keys.alwaysLinkToActor] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings));

        expect(new FlagStrategyFactory(settings).create()).toBeInstanceOf(DefaultFlagsStrategy);
    });

});