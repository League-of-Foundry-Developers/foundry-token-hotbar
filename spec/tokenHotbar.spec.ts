/// <reference path="../node_modules/foundry-pc-types/index.d.ts" />

import 'jasmine';
import { TokenHotbar } from '../src/hotbar/tokenHotbar';
import { TestHotbarFlags } from './helpers/TestHotbarFlags';
import { TestNotifier } from './helpers/TestNotifier';
import { HotbarItem, HotbarData } from '../src/flags/hotbarFlags';
import { DefaultFlagKeyStrategy, FlagKeyStrategy } from '../src/flags/flagKeyStrategies';
import { Macro } from '../src/foundry'

describe('TokenHotbar.save', () => {
    it('should not save if the current page is not the hotbar page', () => {
        // Arrange
        const flags = new TestHotbarFlags();
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestNotifier(),
            1,
            5,
            new DefaultFlagKeyStrategy());
        var token: Token = <Token>{};

        // Act & Assert
        expect(tokenHotbar.save(token, [], true)).toBeFalse();
    });

    it('it will save macros placed in the right slots', () => {
        // Arrange
        const flags = new TestHotbarFlags();
        spyOn(flags, "set").and.callThrough();
        const keyStrategy = new DefaultFlagKeyStrategy();
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestNotifier(),
            5,
            5,
            keyStrategy);
        var token = { id: "token-id" };
        const macrosToSave: Macro[] = [
            { slot: 1, macro: { id: "1" }},
            { slot: 42, macro: {id: "2" }}
        ]

        // Act
        expect(tokenHotbar.save(token, macrosToSave, true)).toBeTrue();

        // Assert
        const key = keyStrategy.get(token.id);
        const item : HotbarItem = { slot: 42, id: "2" };
        const data: HotbarData = {};
        data[key] = [item];
        expect(flags.set).toHaveBeenCalledWith(token.id, data);
    });
});

describe('TokenHotbar.load', () => {
    it('should return false if there is not token hotbar.', () => {
        // Arrange
        const flags = new TestHotbarFlags();
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestNotifier(),
            5,
            5,
            new DefaultFlagKeyStrategy());
        var token: Token = <Token>{ data: { actorLink: false } };

        // Act
        let result = tokenHotbar.load(token, {}, []);

        // Assert
        expect(result.hasMacros).toBeFalse();
    });

    it('should return false if macros from the token bar no longer exist.', () => {
        // Arrange
        const flags = new TestHotbarFlags();
        flags.set("token-id", {"token-id": [ { id: "macro-id", slot: 41 }]})
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestNotifier(),
            5,
            5,
            new DefaultFlagKeyStrategy());
        var token: Token = <Token>{ id: "token-id", data: { actorLink: false } };
        const gameMacros = [{id: "other-macro-id"}];

        // Act
        let result = tokenHotbar.load(token, {}, gameMacros);

        // Assert
        expect(result.hasMacros).toBeFalse();
    });

    it('should return true if there is a token hotbar.', () => {
        // Arrange
        const flags = new TestHotbarFlags();
        flags.set("token-id", {"token-id": [ { id: "macro-id", slot: 41 }]})
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestNotifier(),
            5,
            5,
            new DefaultFlagKeyStrategy());
        var token: Token = <Token>{ id: "token-id", data: { actorLink: false } };
        const gameMacros = [{id: "macro-id"}];
        
        // Act
        let result = tokenHotbar.load(token, {}, gameMacros);

        // Assert
        expect(result.hasMacros).toBeTrue();
    });

    it('should call update on user with intersection of token hotbar and game macros.', async () => {
        // Arrange
        const flags = new TestHotbarFlags();
        flags.set("token-id", {"token-id": [ { id: "macro-id", slot: 41 }, { id: "non-existent-macro", slot: 42}]})
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestNotifier(),
            5,
            5,
            new DefaultFlagKeyStrategy());
        var token: Token = <Token>{ id: "token-id", data: { actorLink: false } };
        const gameMacros = [{id: "macro-id"}, {id: "other-macro-id"}];
        
        // Act
        let result = tokenHotbar.load(token, {}, gameMacros);

        // Assert
        expect(result.hasMacros).toBeTrue();
        expect(result.hotbar).toEqual({41: "macro-id", "-=42": null, "-=43": null, "-=44": null, "-=45": null, "-=46": null, "-=47": null, "-=48": null, "-=49": null, "-=50": null })
    });
});

describe('TokenHotbar.remove', () => {
    it('updates the flags with the specific key removed', () => {
        // Arrange
        const flags = new TestHotbarFlags();
        flags.set("token-1", { 
            "token-1": [ { id: "macro-1", slot: 1 } ],
            "token-2": [ { id: "macro-1", slot: 1 } ]
        });
        spyOn(flags, "set").and.callThrough();
        const keyStrategy = new DefaultFlagKeyStrategy();
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestNotifier(),
            5,
            5,
            keyStrategy);

        // Act
        tokenHotbar.remove("token-1");

        // Assert
        const item : HotbarItem = { slot: 1, id: "macro-1" };
        const data: HotbarData = {};
        const key = keyStrategy.get("token-2");
        data[key] = [item];
        expect(flags.set).toHaveBeenCalledWith("token-1", data);
    });

    it('does not remove the actor hotbar on a linked token', () => {
        // Arrange
        const linkedKeyStrategy = <FlagKeyStrategy>{ get: (_) => "actor-1" };
        const tokenId = "token-1";

        const hotbarData = { "actor-1": [ { id: "macro-1", slot: 1 } ] }
        const expectedData = JSON.parse(JSON.stringify(hotbarData)); // ensure we have a clone instead of a reference

        const flags = new TestHotbarFlags();
        flags.set(linkedKeyStrategy.get(tokenId), hotbarData);
        spyOn(flags, "set").and.callThrough();
        const tokenHotbar = new TokenHotbar(
            flags,
            new TestNotifier(),
            5,
            5,
            linkedKeyStrategy);

        // Act
        tokenHotbar.remove(tokenId);

        // Assert
        expect(flags.set).toHaveBeenCalledWith(tokenId, expectedData);
    });
});