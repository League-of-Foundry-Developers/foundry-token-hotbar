/// <reference path="../node_modules/foundry-pc-types/index.d.ts" />

import 'jasmine';
import { TokenHotbar, Macro } from '../src/tokenHotbar';
import { TestHotbarFlags } from './helpers/TestHotbarFlags';
import { TestNotifier } from './helpers/TestNotifier';
import { TestUser } from './helpers/TestUser';
import { HotbarItem, HotbarData, DefaultFlagKeyStrategy } from '../src/hotbarFlags';

describe('TokenHotbar.save', () => {
    it('should not save if the current page is not the hotbar page', () => {
        const flags = new TestHotbarFlags();
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestUser(),
            new TestNotifier(),
            1,
            5,
            new DefaultFlagKeyStrategy());
        var token: Token = <Token>{};
        expect(tokenHotbar.save(token, [])).toBeFalse();
    });

    it('it will save macros placed in the right slots', () => {
        const flags = new TestHotbarFlags();
        spyOn(flags, "set").and.callThrough();
        const keyStrategy = new DefaultFlagKeyStrategy();
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestUser(),
            new TestNotifier(),
            5,
            5,
            keyStrategy);
        var token = { id: "token-id" };
        const macrosToSave: Macro[] = [
            { slot: 1, macro: { id: "1" }},
            { slot: 42, macro: {id: "2" }}
        ]
        expect(tokenHotbar.save(token, macrosToSave)).toBeTrue();
        const key = keyStrategy.get(token.id);
        const item : HotbarItem = { slot: 42, id: "2" };
        const data: HotbarData = {};
        data[key] = [item];
        expect(flags.set).toHaveBeenCalledWith(token.id, data);
    });
});

describe('TokenHotbar.load', () => {
    it('should return false if there is not token hotbar.', async () => {
        const flags = new TestHotbarFlags();
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestUser(),
            new TestNotifier(),
            5,
            5,
            new DefaultFlagKeyStrategy());
        var token: Token = <Token>{ data: { actorLink: false } };
        await expectAsync(tokenHotbar.load(token, {}, [])).toBeResolvedTo(false);
    });

    it('should return false if macros from the token bar no longer exist.', async () => {
        const flags = new TestHotbarFlags();
        flags.set("token-id", {"token-id": [ { id: "macro-id", slot: 41 }]})
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestUser(),
            new TestNotifier(),
            5,
            5,
            new DefaultFlagKeyStrategy());
        var token: Token = <Token>{ id: "token-id", data: { actorLink: false } };
        const gameMacros = [{id: "other-macro-id"}];
        
        await expectAsync(tokenHotbar.load(token, {}, gameMacros)).toBeResolvedTo(false);
    });

    it('should return true if there is a token hotbar.', async () => {
        const flags = new TestHotbarFlags();
        flags.set("token-id", {"token-id": [ { id: "macro-id", slot: 41 }]})
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestUser(),
            new TestNotifier(),
            5,
            5,
            new DefaultFlagKeyStrategy());
        var token: Token = <Token>{ id: "token-id", data: { actorLink: false } };
        const gameMacros = [{id: "macro-id"}];
        
        await expectAsync(tokenHotbar.load(token, {}, gameMacros)).toBeResolvedTo(true);
    });

    it('should call update on user with intersection of token hotbar and game macros.', async () => {
        const flags = new TestHotbarFlags();
        flags.set("token-id", {"token-id": [ { id: "macro-id", slot: 41 }, { id: "non-existent-macro", slot: 42}]})
        const user = new TestUser();
        spyOn(user, "update").and.callThrough();
        const tokenHotbar = new TokenHotbar(
            flags,
            user,
            new TestNotifier(),
            5,
            5,
            new DefaultFlagKeyStrategy());
        var token: Token = <Token>{ id: "token-id", data: { actorLink: false } };
        const gameMacros = [{id: "macro-id"}, {id: "other-macro-id"}];
        
        await tokenHotbar.load(token, {}, gameMacros);
        expect(user.update).toHaveBeenCalledWith({hotbar: {41: "macro-id", "-=42": null, "-=43": null, "-=44": null, "-=45": null, "-=46": null, "-=47": null, "-=48": null, "-=49": null, "-=50": null }});
    });
});

describe('TokenHotbar.remove', () => {
    it('updates the flags with the specific key removed', () => {
        const flags = new TestHotbarFlags();
        flags.set("token-1", { 
            "token-1": [ { id: "macro-1", slot: 1 } ],
            "token-2": [ { id: "macro-1", slot: 1 } ]
        });
        spyOn(flags, "set").and.callThrough();
        const keyStrategy = new DefaultFlagKeyStrategy();
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestUser(),
            new TestNotifier(),
            5,
            5,
            keyStrategy);
        tokenHotbar.remove("token-1");
        const item : HotbarItem = { slot: 1, id: "macro-1" };
        const data: HotbarData = {};
        const key = keyStrategy.get("token-2");
        data[key] = [item];
        expect(flags.set).toHaveBeenCalledWith("token-1", data);
    });
});