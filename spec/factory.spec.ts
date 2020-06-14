import 'jasmine';
import { Settings } from '../src/settings';
import { FlagStrategyFactory } from '../src/flags/factory';
import { UserFlagsStrategy, IdentityFlagsStrategy, LinkedFlagsStrategy, AlwaysLinkedFlagsStrategy } from '../src/flags/flagStrategies';
import { TestClientSettings } from './helpers/TestSettings';

// Configuration combinations
// shared |  link | always |  entity   | key
//    1   |   0   |    0   |  identity | identity
//    1   |   1   |    0   |  link     | link
//    1   |   -   |    1   |  actor    | actor
//    0   |   0   |    0   |  user     | identity
//    0   |   1   |    0   |  user     | link
//    0   |   -   |    1   |  user     | actor

describe('FlagKeyStrategyFactory', () => {
    [true, false].forEach(isShared => {
        it('should return LinkedFlagKeyStrategy if hotbar is not linked to linked actor.', () => {
            const clientSettings = {};
            clientSettings[Settings.keys.shareHotbar] = isShared;
            clientSettings[Settings.keys.linkToLinkedActor] = false;
            const settings = new Settings().load(new TestClientSettings(clientSettings));

            expect(new FlagStrategyFactory(settings, {}, {}).createFlagKeyStrategy()).toBeInstanceOf(IdentityFlagsStrategy);
        });

        it('should return LinkedFlagKeyStrategy if hotbar is linked to linked actor.', () => {
            const clientSettings = {};
            clientSettings[Settings.keys.shareHotbar] = isShared;
            clientSettings[Settings.keys.linkToLinkedActor] = true;
            const settings = new Settings().load(new TestClientSettings(clientSettings));

            expect(new FlagStrategyFactory(settings, {}, {}).createFlagKeyStrategy()).toBeInstanceOf(LinkedFlagsStrategy);
        });

        it('should return AlwaysLinkedFlagKeyStrategy if hotbar is always linked to actor.', () => {
            const clientSettings = {};
            clientSettings[Settings.keys.shareHotbar] = isShared;
            clientSettings[Settings.keys.linkToLinkedActor] = true;
            clientSettings[Settings.keys.alwaysLinkToActor] = true;
            const settings = new Settings().load(new TestClientSettings(clientSettings));

            expect(new FlagStrategyFactory(settings, {}, {}).createFlagKeyStrategy()).toBeInstanceOf(AlwaysLinkedFlagsStrategy);
        });
    });
});

describe('FlagStrategyFactory', () => {
    it('should return SharedLinkFlagsStrategy if hotbar is shared and linked to actor.', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.linkToLinkedActor] = true;
        clientSettings[Settings.keys.shareHotbar] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings));

        expect(new FlagStrategyFactory(settings, {}, {}).createFlagStrategy()).toBeInstanceOf(LinkedFlagsStrategy);
    });

    it('should return SharedAlwaysLinkedFlagsStrategy if hotbar is shared and linked to actor.', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.shareHotbar] = true;
        clientSettings[Settings.keys.linkToLinkedActor] = true;
        clientSettings[Settings.keys.alwaysLinkToActor] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings));

        expect(new FlagStrategyFactory(settings, {}, {}).createFlagStrategy()).toBeInstanceOf(AlwaysLinkedFlagsStrategy);
    });

    it('should return IdentityFlagsStrategy if hotbar is shared and not linked to linked actor.', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.shareHotbar] = true;
        clientSettings[Settings.keys.linkToLinkedActor] = false;
        clientSettings[Settings.keys.alwaysLinkToActor] = false;
        const settings = new Settings().load(new TestClientSettings(clientSettings));

        expect(new FlagStrategyFactory(settings, {}, {}).createFlagStrategy()).toBeInstanceOf(IdentityFlagsStrategy);
    });

    it('should return UserFlagsStrategy if hotbar is not shared', () => {
        const clientSettings = {};
        clientSettings[Settings.keys.shareHotbar] = false;
        clientSettings[Settings.keys.linkToLinkedActor] = true;
        clientSettings[Settings.keys.alwaysLinkToActor] = true;
        const settings = new Settings().load(new TestClientSettings(clientSettings));

        expect(new FlagStrategyFactory(settings, {}, {}).createFlagStrategy()).toBeInstanceOf(UserFlagsStrategy);
    });

});