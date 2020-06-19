import 'jasmine';
import { TokenHotbar } from '../../src/hotbar/tokenHotbar';
import { ModuleHotbarFlags, HotbarData } from '../../src/flags/hotbarFlags';
import { IToken, IActor } from '../../src/foundry';
import { IdentityFlagsStrategy, UserFlagsStrategy, LinkedFlagsStrategy } from '../../src/flags/flagStrategies';
import { TestFlaggable, TestToken } from '../helpers/TestToken';
import { ConsoleLogger } from '../../src/logger';
import { Settings } from '../../src/settings';
import { HotbarSlots } from '../../src/hotbar/hotbar';

describe('TokenHotbar.remove', () => {
    beforeEach(function () {
        this.user = new TestFlaggable('user-1');
        this.actor = new TestFlaggable('actor-1');
        this.token = new TestToken('token-1', this.actor);
        this.tokens = new Map<string, IToken>();
        this.actors = new Map<string, IActor>();

        this.tokens.set(this.token.id, this.token);
        this.actors.set(this.actor.id, this.actor);

        this.page = 5;

        const userFlags = new UserFlagsStrategy(this.user, this.actors, this.tokens);
        this.flags = new ModuleHotbarFlags(userFlags);
        this.keyStrategy = new IdentityFlagsStrategy(this.actors, this.tokens);
        this.key = this.keyStrategy.get(this.token.id).id;
        this.allMacros = [ {id: '1'}, {id: '2'} ];

        this.tokenHotbar = new TokenHotbar(this.token.id, this.allMacros, this.flags, this.keyStrategy, new ConsoleLogger(new Settings()));
    });

    it('updates the flags with the specific key removed', async function () {
        // Arrange
        const token2 = <IToken> { id: 'token-2' };
        this.tokens.set(token2.id, token2);

        const slots: HotbarSlots = { 1 : 'macro-1' };
        await this.flags.set(this.token.id, { 
            [this.token.id]: slots,
            [token2.id]: slots
        });
        spyOn(this.flags, 'set').and.callThrough();

        // Act
        this.tokenHotbar.removeTokenMacros(this.actors, this.tokens);

        // Assert
        const data: HotbarData = {};
        const key = this.keyStrategy.get(token2.id);
        data[key.id] = { 1: 'macro-1' };
        expect(this.flags.set).toHaveBeenCalledWith(this.token.id, data);
    });

    it('does not remove the actor hotbar on a linked token', async function () {
        // Arrange
        const linkedKeyStrategy = new LinkedFlagsStrategy(this.actors, this.tokens);

        const hotbarData: HotbarData = { 'actor-1': { 1: 'macro-1'} };
        const expectedData = JSON.parse(JSON.stringify(hotbarData)); // ensure we have a clone instead of a reference

        await this.flags.set(linkedKeyStrategy.get(this.token.id).id, hotbarData);
        spyOn(this.flags, 'set').and.callThrough();
        const tokenHotbar = new TokenHotbar(
            this.token.id,
            this.allMacros,
            this.flags,
            linkedKeyStrategy,
            new ConsoleLogger(new Settings()));

        // Act
        await tokenHotbar.removeTokenMacros(this.actors, this.tokens);

        // Assert
        expect(this.flags.set).toHaveBeenCalledWith(this.token.id, expectedData);
    });
});