import 'jasmine';
import { TokenHotbar } from '../src/hotbar/tokenHotbar';
import { TestNotifier } from './helpers/TestNotifier';
import { FoundryHotbarFlags, HotbarItem, HotbarData } from '../src/flags/hotbarFlags';
import { Macro, IToken, IActor } from '../src/foundry';
import { IdentityFlagsStrategy, UserFlagsStrategy, LinkedFlagsStrategy } from '../src/flags/flagStrategies';
import { TestFlaggable, TestToken } from './helpers/TestToken';
import { ConsoleLogger } from '../src/logger';
import { Settings } from '../src/settings';

describe('TokenHotbar.save', async () => {
    const notifier = new TestNotifier();
    const tokens = new Map();
    tokens.set('token-1', <IToken>{ id : 'token-1' });

    it('it will save macros placed in the right slots', async () => {
        // Arrange
        const flags = new FoundryHotbarFlags(new UserFlagsStrategy(new TestFlaggable('user-1'), new Map(), tokens));
        const keyStrategy = new IdentityFlagsStrategy(new Map(), tokens);
        const tokenHotbar = new TokenHotbar(flags, notifier, 5, keyStrategy, new ConsoleLogger(new Settings()));
        const token = tokens.get('token-1');
        const macrosToSave: Macro[] = [
            { slot: 1, macro: { id: '1' }},
            { slot: 42, macro: {id: '2' }}
        ];

        // Act
        spyOn(flags, 'set').and.callThrough();
        await expectAsync(tokenHotbar.save(token, macrosToSave, true)).toBeResolvedTo(true);

        // Assert
        const key = keyStrategy.get(token.id);
        const item : HotbarItem = { slot: 42, id: '2' };
        const data: HotbarData = {};
        data[key.id] = [item];
        expect(flags.set).toHaveBeenCalledWith(token.id, data);
    });
});

describe('TokenHotbar.load', () => {
    const tokens = new Map();
    const actors = new Map();

    const actor = new TestFlaggable('actor-1');
    const token1 = new TestToken('token-1', actor);
    const token2 = new TestToken('token-2', actor);
    const unlinkedToken = new TestToken('token-3', actor);
    unlinkedToken.data.actorLink = false;

    [token1, token2, unlinkedToken].map(t => tokens.set(t.id, t));
    actors.set(actor.id, actor);

    it('should return false if there is no token hotbar.', () => {
        // Arrange
        const flags = new FoundryHotbarFlags(new UserFlagsStrategy(new TestFlaggable('user-1'), actors, tokens));
        const tokenHotbar = new TokenHotbar(flags, new TestNotifier(), 5, new IdentityFlagsStrategy(actors, tokens), new ConsoleLogger(new Settings()));

        // Act
        const result = tokenHotbar.load(token1, {}, []);

        // Assert
        expect(result.hasMacros).toBeFalse();
    });

    it('should return false if macros from the token bar no longer exist.', () => {
        // Arrange
        const flags = new FoundryHotbarFlags(new UserFlagsStrategy(new TestFlaggable('user-1'), actors, tokens));
        flags.set(token1.id, {'token-1': [ { id: 'macro-id', slot: 41 }]});
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestNotifier(),
            5,
            new IdentityFlagsStrategy(actors, tokens),
            new ConsoleLogger(new Settings()));
        const gameMacros = [{id: 'other-macro-id'}];

        // Act
        const result = tokenHotbar.load(token1, {}, gameMacros);

        // Assert
        expect(result.hasMacros).toBeFalse();
    });

    it('should return true if there is a token hotbar.', async () => {
        // Arrange
        const flags = new FoundryHotbarFlags(new UserFlagsStrategy(new TestFlaggable('user-1'), actors, tokens));
        await flags.set(token1.id, {'token-1': [ { id: 'macro-id', slot: 41 }]});
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestNotifier(),
            5,
            new IdentityFlagsStrategy(actors, tokens),
            new ConsoleLogger(new Settings()));
        const gameMacros = [{id: 'macro-id'}];
        
        // Act
        const result = tokenHotbar.load(token1, {}, gameMacros);

        // Assert
        expect(result.hasMacros).toBeTrue();
    });

    it('should call update on user with intersection of token hotbar and game macros.', async () => {
        // Arrange
        const flags = new FoundryHotbarFlags(new UserFlagsStrategy(new TestFlaggable('user-1'), actors, tokens));
        await flags.set(token1.id, {'token-1': [ { id: 'macro-id', slot: 41 }, { id: 'non-existent-macro', slot: 42}]});
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestNotifier(),
            5,
            new IdentityFlagsStrategy(actors, tokens),
            new ConsoleLogger(new Settings()));
        const gameMacros = [{id: 'macro-id'}, {id: 'other-macro-id'}];
        
        // Act
        const result = tokenHotbar.load(token1, {}, gameMacros);

        // Assert
        expect(result.hasMacros).toBeTrue();
        expect(result.hotbar).toEqual({41: 'macro-id', '-=42': null, '-=43': null, '-=44': null, '-=45': null, '-=46': null, '-=47': null, '-=48': null, '-=49': null, '-=50': null });
    });
});

describe('TokenHotbar.remove', () => {
    const tokens = new Map();
    const actors = new Map();

    const actor = new TestFlaggable('actor-1');
    const token1 = new TestToken('token-1', actor);
    const token2 = new TestToken('token-2', actor);
    const unlinkedToken = new TestToken('token-3', actor);
    unlinkedToken.data.actorLink = false;

    [token1, token2, unlinkedToken].map(t => tokens.set(t.id, t));
    actors.set(actor.id, actor);

    it('updates the flags with the specific key removed', async () => {
        // Arrange
        const flags = new FoundryHotbarFlags(new UserFlagsStrategy(new TestFlaggable('user-1'), actors, tokens));
        await flags.set(token1.id, { 
            'token-1': [ { id: 'macro-1', slot: 1 } ],
            'token-2': [ { id: 'macro-1', slot: 1 } ]
        });
        spyOn(flags, 'set').and.callThrough();
        const keyStrategy = new IdentityFlagsStrategy(actors, tokens);
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestNotifier(),
            5,
            keyStrategy,
            new ConsoleLogger(new Settings()));

        // Act
        tokenHotbar.remove(token1.id, actors, tokens);

        // Assert
        const item : HotbarItem = { slot: 1, id: 'macro-1' };
        const data: HotbarData = {};
        const key = keyStrategy.get(token2.id);
        data[key.id] = [item];
        expect(flags.set).toHaveBeenCalledWith(token1.id, data);
    });

    // TODO: rewrite test / refactor so that the test isn't harder to read than the code...
    it('does not remove the actor hotbar on a linked token', async () => {
        // Arrange
        const actor : IActor = new TestFlaggable('actor-1');
        const token : IToken = new TestToken('token-1', actor);

        const actors = new Map<string, IActor>();
        const tokens = new Map<string, IToken>();
        actors.set(actor.id, actor);
        tokens.set(token.id, token);

        const linkedKeyStrategy = new LinkedFlagsStrategy(actors, tokens);

        const hotbarData = { 'actor-1': [ { id: 'macro-1', slot: 1 } ] };
        const expectedData = JSON.parse(JSON.stringify(hotbarData)); // ensure we have a clone instead of a reference

        const flags = new FoundryHotbarFlags(
            new UserFlagsStrategy(new TestFlaggable('user-1'), actors, tokens));
        await flags.set(linkedKeyStrategy.get(token.id).id, hotbarData);
        spyOn(flags, 'set').and.callThrough();
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestNotifier(),
            5,
            linkedKeyStrategy,
            new ConsoleLogger(new Settings()));

        // Act
        await tokenHotbar.remove(token.id, actors, tokens);

        // Assert
        expect(flags.set).toHaveBeenCalledWith(token.id, expectedData);
    });
});