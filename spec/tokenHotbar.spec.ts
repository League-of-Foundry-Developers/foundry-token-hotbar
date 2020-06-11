/// <reference path="../node_modules/foundry-pc-types/index.d.ts" />

import 'jasmine';
import { Settings }  from '../src/settings';
import { TokenHotbar }  from '../src/tokenHotbar';
import { TestHotbarFlags } from './helpers/TestHotbarFlags';
import { TestNotifier } from './helpers/TestNotifier';
import { TestUser } from './helpers/TestUser';

const HotbarPage = 5;

function create(page: number) {
    var settings = new Settings();
    settings.hotbarPage = HotbarPage;
    var flags = new TestHotbarFlags();
    var notifier = new TestNotifier();
    return new TokenHotbar(settings, flags, new TestUser(), notifier, page);
}

describe('TokenHotbar.save', () => {
    it('should not save if there are not controlled tokens', () => {
        var tokenHotbar = create(HotbarPage);
        expect(tokenHotbar.save([], null)).toBeFalse();
    });

    it('should not save if the current page is not the hotbar page', () => {
        const currentPage = HotbarPage - 1;
        var tokenHotbar = create(currentPage);
        var token: Token = <Token>{};
        expect(tokenHotbar.save([token], null)).toBeFalse();
    });
});

describe('TokenHotbar.load', () => {
    it('should return false if there are not controlled tokens', () => {
        var tokenHotbar = create(5);

        expectAsync(tokenHotbar.load([], {})).toBeResolvedTo(false);
    });

    it('should return false if there is not token hotbar.', () => {
        const currentPage = 1;
        var tokenHotbar = create(currentPage);
        var token: Token = <Token>{data: { actorLink: false}};
        expectAsync(tokenHotbar.load([token], {})).toBeResolvedTo(false);
    });

    xit('should return true if there is a token hotbar.', () => {
    });
});