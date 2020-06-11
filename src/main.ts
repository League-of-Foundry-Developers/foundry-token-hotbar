import { Settings } from './settings';
import { Hotbar } from './hotbar';
import { CONSTANTS } from './constants'; 
import { FoundryHotbarFlags } from './hotbarLoader'; 

function migrateFlag() {
    let data = game.user.getFlag("world", "token-hotbar");
    if (!data) return;

    game.user.setFlag("world", CONSTANTS.moduleName, data);
    game.user.unsetFlag("world", "token-hotbar");
}

function createTokenHotbar() {
    const settings = new Settings().load(game.settings);
    const hotbarFlags = new FoundryHotbarFlags(settings);
    return new Hotbar(settings, hotbarFlags, game.user);
}

Hooks.on("init", () => {
    migrateFlag();

    game.settings.register(CONSTANTS.moduleName, Settings.keys.hotbarPage, {
        name: "Page",
        hint: "The hotbar page that will be replaced with the token hotbar. Changing this will wipe existing token bars!",
        scope: "world",
        config: true,
        default: 5,
        type: Number
    });

    game.settings.register(CONSTANTS.moduleName, Settings.keys.linkToLinkedActor, {
        name: "Link to linked actor",
        hint: "Link the token hotbar to the actor if the token is linked.",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register(CONSTANTS.moduleName, Settings.keys.alwaysLinkToActor, {
        name: "Always link to actor",
        hint: "Link the token hotbar to the actor even if the token is unlinked.",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register(CONSTANTS.moduleName, Settings.keys.shareHotbar, {
        name: "Share the hotbar with other players",
        hint: "When set every token will have a single hotbar shared by all players.",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register(CONSTANTS.moduleName, Settings.keys.lockHotbar, {
        name: "Lock shared hotbar",
        hint: "When set, only a GM can update the token hotbar. Only applies to shared hotbars.",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
});

Hooks.on("renderHotbar", (data:any) => {
    const controlledTokens = canvas.tokens.controlled;
    createTokenHotbar().save(controlledTokens, data.macros);
    return true;
});

Hooks.on("controlToken", () => {
    const controlledTokens = canvas.tokens.controlled;
    // hotbar does not exist on game.user.data for some reason
    createTokenHotbar().load(controlledTokens, duplicate((<any>game.user.data).hotbar));
    return true;
});

Hooks.on("deleteToken", (_: Scene, token: any) => {
    createTokenHotbar().remove(token._id);
    return true;
});

Hooks.on("deleteActor", (actor: any) => {
    createTokenHotbar().remove(actor.data._id);
    return true;
});