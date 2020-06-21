import 'jasmine';
import { TokenHotbar } from '../../src/hotbar/tokenHotbar';
import { ModuleHotbarFlags, HotbarData } from '../../src/flags/hotbarFlags';
import { IToken, IActor } from '../../src/utils/foundry';
import { IdentityFlagsStrategy, UserFlagsStrategy } from '../../src/flags/flagStrategies';
import { TestFlaggable } from '../helpers/TestToken';
import { ConsoleLogger } from '../../src/utils/logger';
import { Settings } from '../../src/utils/settings';
import { HotbarSlots } from '../../src/hotbar/hotbar';
import { calculatePageSlots } from '../../src/hotbar/uiHotbar';

describe('TokenHotbar.setTokenMacros', () => {
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

        const logger = new ConsoleLogger(new Settings());
        const userFlags = new UserFlagsStrategy(this.user, this.actors, this.tokens);
        this.flags = new ModuleHotbarFlags(userFlags, logger);
        this.keyStrategy = new IdentityFlagsStrategy(this.actors, this.tokens);
        this.token = this.tokens.get('token-1');
        this.macrosToSave = { 42: 'new-macro' };
        this.key = this.keyStrategy.get(this.token.id).id;
        this.allMacros = [ {id: '1'}, {id: '2'} ];

        this.tokenHotbar = new TokenHotbar(this.token.id, this.allMacros, this.flags, this.keyStrategy, logger);
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
