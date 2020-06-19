import 'jasmine';
import { TokenHotbar } from '../../src/hotbar/tokenHotbar';
import { TestNotifier } from '../helpers/TestNotifier';
import { ModuleHotbarFlags, HotbarItem, HotbarData } from '../../src/flags/hotbarFlags';
import { Macro, IToken, IActor } from '../../src/foundry';
import { IdentityFlagsStrategy, UserFlagsStrategy, LinkedFlagsStrategy } from '../../src/flags/flagStrategies';
import { TestFlaggable, TestToken } from '../helpers/TestToken';
import { ConsoleLogger } from '../../src/logger';
import { Settings } from '../../src/settings';
import { HotbarSlots } from '../../src/hotbar/hotbar';
import { calculatePageSlots } from '../../src/hotbar/uiHotbar';

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
