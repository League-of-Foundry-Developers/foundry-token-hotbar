import 'jasmine';
import { TokenHotbar } from '../../src/hotbar/tokenHotbar';
import { ModuleHotbarFlags } from '../../src/flags/hotbarFlags';
import { IToken, IActor } from '../../src/utils/foundry';
import { IdentityFlagsStrategy, UserFlagsStrategy } from '../../src/flags/flagStrategies';
import { TestFlaggable } from '../helpers/TestToken';
import { ConsoleLogger } from '../../src/utils/logger';
import { Settings } from '../../src/utils/settings';
import { HotbarSlots } from '../../src/hotbar/hotbar';

describe('TokenHotbar.getMacrosByPage', function() {
    beforeEach(function () {
        const user = new TestFlaggable('user-1');
        const token = { id: 'token-1' };
        const tokens = new Map<string, IToken>();
        const actors = new Map<string, IActor>();
        tokens.set(token.id, <IToken>token);
        
        const logger = new ConsoleLogger(new Settings());
        const userFlags = new UserFlagsStrategy(user, actors, tokens);
        const flags = new ModuleHotbarFlags(userFlags, logger);
        const keyStrategy = new IdentityFlagsStrategy(actors, tokens);

        this.page = 5;
        this.allMacros = [ {id: '1'}, {id: '2'} ];
        this.tokenHotbar = new TokenHotbar(token.id, this.allMacros, flags, keyStrategy, logger);
    });

    it('returns an empty page if there is no token hotbar.', function() {
        const data: { hotbar: HotbarSlots } = this.tokenHotbar.getMacrosByPage(this.page);
        expect(Object.keys(data.hotbar).length).toEqual(0);
    });

    it('should return an empty hotbar if macros no longer exists', async function() {
        await this.tokenHotbar.setTokenMacros(this.page, { hotbar: { 41: 5 } });

        const data: { hotbar: HotbarSlots } = this.tokenHotbar.getMacrosByPage(this.page);

        expect(Object.keys(data.hotbar).length).toEqual(0);
    });

    it('should return true if there is a token hotbar.', async function() {
        await this.tokenHotbar.setTokenMacros(this.page, {hotbar: { 41: this.allMacros[0].id } });
        
        const data: { hotbar: HotbarSlots } = this.tokenHotbar.getMacrosByPage(this.page);

        expect(Object.keys(data.hotbar).length).toEqual(1);
    });
});
