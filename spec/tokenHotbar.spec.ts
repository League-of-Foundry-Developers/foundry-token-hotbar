import 'jasmine';
import { TokenHotbar } from '../src/hotbar/tokenHotbar';
import { TestNotifier } from './helpers/TestNotifier';
import { ModuleHotbarFlags, HotbarItem, HotbarData } from '../src/flags/hotbarFlags';
import { Macro, IToken, IActor } from '../src/foundry';
import { IdentityFlagsStrategy, UserFlagsStrategy, LinkedFlagsStrategy } from '../src/flags/flagStrategies';
import { TestFlaggable, TestToken } from './helpers/TestToken';
import { ConsoleLogger } from '../src/logger';
import { Settings } from '../src/settings';
import { HotbarSlots } from '../src/hotbar/hotbar';
import { calculatePageSlots } from '../src/hotbar/uiHotbar';

describe('TokenHotbar.save', () => {
    function createEmptyPage(page) {
        return calculatePageSlots(page)
            .reduce<HotbarSlots>((acc, cur) => (acc[cur] = undefined, acc), {});
    }
    beforeEach(function () {
        this.user = new TestFlaggable('user-1');
        this.tokens = new Map<string, IToken>();
        this.actors = new Map<string, IActor>();

        this.tokens.set('token-1', <IToken>{ id : 'token-1' });

        this.page = 5;

        const userFlags = new UserFlagsStrategy(this.user, this.actors, this.tokens);
        this.flags = new ModuleHotbarFlags(userFlags);
        this.keyStrategy = new IdentityFlagsStrategy(this.actors, this.tokens);
        this.token = this.tokens.get('token-1');
        this.macrosToSave = { 42: 'new-macro' };
        this.key = this.keyStrategy.get(this.token.id).id;
        this.allMacros = [{id: '1'}, {id: '2'}];

        this.tokenHotbar = new TokenHotbar(this.token.id, this.allMacros, this.flags, this.keyStrategy, new ConsoleLogger(new Settings()));
    });

    it('it saves new macros on the given page', async function() {
        // Arrange
        // Act
        spyOn(this.flags, 'set').and.callThrough();
        await expectAsync(this.tokenHotbar.setTokenMacros(this.page, { hotbar: this.macrosToSave })).toBeResolvedTo(true);

        // Assert
        const key = this.keyStrategy.get(this.token.id);
        const data: HotbarData = { [key.id]: createEmptyPage(this.page)};
        data[key.id][42] = this.macrosToSave[42];
        expect(this.flags.set).toHaveBeenCalledWith(this.token.id, data);
    });

    it('it saves existing macros on other pages', async function() {
        // Arrange
        await this.flags.set(this.token.id, { [this.key]: { 3: 'existing-macro'} });

        // Act
        spyOn(this.flags, 'set').and.callThrough();
        await expectAsync(this.tokenHotbar.setTokenMacros(this.page, { hotbar: this.macrosToSave })).toBeResolvedTo(true);

        // Assert
        const data: HotbarData = { [this.key]: createEmptyPage(this.page)};
        data[this.key][3] = 'existing-macro';
        data[this.key][42] = this.macrosToSave[42];
        expect(this.flags.set).toHaveBeenCalledWith(this.token.id, data);
    });

    it('it overwrites existing macros on the given page.', async function() {
        // Arrange
        await this.flags.set(this.token.id, { [this.key]: { 42: 'existing-macro'} });

        // Act
        spyOn(this.flags, 'set').and.callThrough();
        await expectAsync(this.tokenHotbar.setTokenMacros(this.page, { hotbar: this.macrosToSave })).toBeResolvedTo(true);

        // Assert
        const data: HotbarData = { [this.key]: createEmptyPage(this.page)};
        data[this.key][42] = this.macrosToSave[42];
        expect(this.flags.set).toHaveBeenCalledWith(this.token.id, data);
    });
});

// describe('TokenHotbar.load', () => {
//     const tokens = new Map();
//     const actors = new Map();

//     const actor = new TestFlaggable('actor-1');
//     const token1 = new TestToken('token-1', actor);
//     const token2 = new TestToken('token-2', actor);
//     const unlinkedToken = new TestToken('token-3', actor);
//     unlinkedToken.data.actorLink = false;

//     [token1, token2, unlinkedToken].map(t => tokens.set(t.id, t));
//     actors.set(actor.id, actor);

//     it('should return false if there is no token hotbar.', () => {
//         // Arrange
//         const flags = new ModuleHotbarFlags(new UserFlagsStrategy(new TestFlaggable('user-1'), actors, tokens));
//         const tokenHotbar = new TokenHotbar(flags, new TestNotifier(), 5, new IdentityFlagsStrategy(actors, tokens), new ConsoleLogger(new Settings()));

//         // Act
//         const result = tokenHotbar.load(token1, {}, []);

//         // Assert
//         expect(result.hasMacros).toBeFalse();
//     });

//     it('should return an empty hotbar if there is no token hotbar.', () => {
//         // Arrange
//         const flags = new ModuleHotbarFlags(new UserFlagsStrategy(new TestFlaggable('user-1'), actors, tokens));
//         const tokenHotbar = new TokenHotbar(flags, new TestNotifier(), 5, new IdentityFlagsStrategy(actors, tokens), new ConsoleLogger(new Settings()));

//         // Act
//         const result = tokenHotbar.load(token1, {}, []);

//         // Assert
//         let values = obj => Object.keys(obj).map(key => obj[key]);
//         expect(values(result.hotbar).length).toBeGreaterThan(0);
//         expect(values(result.hotbar).reduce((acc, cur) => acc || cur)).toBeFalsy();
//     });

//     it('should return false if macros from the token bar no longer exist.', () => {
//         // Arrange
//         const flags = new ModuleHotbarFlags(new UserFlagsStrategy(new TestFlaggable('user-1'), actors, tokens));
//         flags.set(token1.id, {'token-1': [ { id: 'macro-id', slot: 41 }]});
//         const tokenHotbar = new TokenHotbar(
//             flags,
//             new TestNotifier(),
//             5,
//             new IdentityFlagsStrategy(actors, tokens),
//             new ConsoleLogger(new Settings()));
//         const gameMacros = [{id: 'other-macro-id'}];

//         // Act
//         const result = tokenHotbar.load(token1, {}, gameMacros);

//         // Assert
//         expect(result.hasMacros).toBeFalse();
//     });

//     it('should return true if there is a token hotbar.', async () => {
//         // Arrange
//         const flags = new ModuleHotbarFlags(new UserFlagsStrategy(new TestFlaggable('user-1'), actors, tokens));
//         await flags.set(token1.id, {'token-1': [ { id: 'macro-id', slot: 41 }]});
//         const tokenHotbar = new TokenHotbar(
//             flags,
//             new TestNotifier(),
//             5,
//             new IdentityFlagsStrategy(actors, tokens),
//             new ConsoleLogger(new Settings()));
//         const gameMacros = [{id: 'macro-id'}];
        
//         // Act
//         const result = tokenHotbar.load(token1, {}, gameMacros);

//         // Assert
//         expect(result.hasMacros).toBeTrue();
//     });

//     it('should call update on user with intersection of token hotbar and game macros.', async () => {
//         // Arrange
//         const flags = new ModuleHotbarFlags(new UserFlagsStrategy(new TestFlaggable('user-1'), actors, tokens));
//         await flags.set(token1.id, {'token-1': [ { id: 'macro-id', slot: 41 }, { id: 'non-existent-macro', slot: 42}]});
//         const tokenHotbar = new TokenHotbar(
//             flags,
//             new TestNotifier(),
//             5,
//             new IdentityFlagsStrategy(actors, tokens),
//             new ConsoleLogger(new Settings()));
//         const gameMacros = [{id: 'macro-id'}, {id: 'other-macro-id'}];
        
//         // Act
//         const result = tokenHotbar.load(token1, {}, gameMacros);

//         // Assert
//         expect(result.hasMacros).toBeTrue();
//         expect(result.hotbar).toEqual({'41': 'macro-id', '-=42': null, '-=43': null, '-=44': null, '-=45': null, '-=46': null, '-=47': null, '-=48': null, '-=49': null, '-=50': null });
//     });
// });

// describe('TokenHotbar.remove', () => {
//     const tokens = new Map();
//     const actors = new Map();

//     const actor = new TestFlaggable('actor-1');
//     const token1 = new TestToken('token-1', actor);
//     const token2 = new TestToken('token-2', actor);
//     const unlinkedToken = new TestToken('token-3', actor);
//     unlinkedToken.data.actorLink = false;

//     [token1, token2, unlinkedToken].map(t => tokens.set(t.id, t));
//     actors.set(actor.id, actor);

//     it('updates the flags with the specific key removed', async () => {
//         // Arrange
//         const flags = new ModuleHotbarFlags(new UserFlagsStrategy(new TestFlaggable('user-1'), actors, tokens));
//         await flags.set(token1.id, { 
//             'token-1': [ { id: 'macro-1', slot: 1 } ],
//             'token-2': [ { id: 'macro-1', slot: 1 } ]
//         });
//         spyOn(flags, 'set').and.callThrough();
//         const keyStrategy = new IdentityFlagsStrategy(actors, tokens);
//         const tokenHotbar = new TokenHotbar(
//             flags,
//             new TestNotifier(),
//             5,
//             keyStrategy,
//             new ConsoleLogger(new Settings()));

//         // Act
//         tokenHotbar.remove(token1.id, actors, tokens);

//         // Assert
//         const item : HotbarItem = { slot: 1, id: 'macro-1' };
//         const data: HotbarData = {};
//         const key = keyStrategy.get(token2.id);
//         data[key.id] = [item];
//         expect(flags.set).toHaveBeenCalledWith(token1.id, data);
//     });

//     // TODO: rewrite test / refactor so that the test isn't harder to read than the code...
//     it('does not remove the actor hotbar on a linked token', async () => {
//         // Arrange
//         const actor : IActor = new TestFlaggable('actor-1');
//         const token : IToken = new TestToken('token-1', actor);

//         const actors = new Map<string, IActor>();
//         const tokens = new Map<string, IToken>();
//         actors.set(actor.id, actor);
//         tokens.set(token.id, token);

//         const linkedKeyStrategy = new LinkedFlagsStrategy(actors, tokens);

//         const hotbarData = { 'actor-1': [ { id: 'macro-1', slot: 1 } ] };
//         const expectedData = JSON.parse(JSON.stringify(hotbarData)); // ensure we have a clone instead of a reference

//         const flags = new ModuleHotbarFlags(
//             new UserFlagsStrategy(new TestFlaggable('user-1'), actors, tokens));
//         await flags.set(linkedKeyStrategy.get(token.id).id, hotbarData);
//         spyOn(flags, 'set').and.callThrough();
//         const tokenHotbar = new TokenHotbar(
//             flags,
//             new TestNotifier(),
//             5,
//             linkedKeyStrategy,
//             new ConsoleLogger(new Settings()));

//         // Act
//         await tokenHotbar.remove(token.id, actors, tokens);

//         // Assert
//         expect(flags.set).toHaveBeenCalledWith(token.id, expectedData);
//     });
// });