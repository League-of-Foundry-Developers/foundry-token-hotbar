import { Settings } from './settings';
import { TokenHotbar } from './tokenHotbar';
import { CONSTANTS } from './constants';
import { HotbarFlagsFactory, DefaultGetFlagKeyStrategy } from './hotbarFlags';
import { UserHotbar } from './userHotbar';
import { PageFlag } from './pageFlag';

function migrateFlag() {
    let oldData = game.user.getFlag("world", "token-hotbar");
    let newData = game.user.getFlag("world", CONSTANTS.moduleName);
    if (!oldData || newData) return;

    console.info("Migrating Token Hotbar...");

    game.user.setFlag("world", CONSTANTS.moduleName, oldData);
    game.user.unsetFlag("world", "token-hotbar");
}

function createTokenHotbar() {
    const settings = new Settings().load(game.settings);
    const hotbarFlags = new HotbarFlagsFactory(settings);
    return new TokenHotbar(
        hotbarFlags.create(),
        game.user,
        ui.notifications,
        (<any>ui).hotbar.page,
        settings.hotbarPage,
        new DefaultGetFlagKeyStrategy()); // TODO: get appropriate one from settings
}

Hooks.on("init", () => {
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

    console.log("initialized Token Hotbar");
    setTimeout(migrateFlag, 200);
});

Hooks.on("renderHotbar", (data: any) => {
    // const macros = data.macros;
    // FIXME: due to a race condition, sometimes the wrong macros are passed.
    //        We are only interested in the ones on the token hotbar.
    const settings = new Settings().load(game.settings);
    const macros = (<any>ui).hotbar._getMacrosByPage(settings.hotbarPage);

    const token = canvas.tokens.controlled[0];
    if (token)
        createTokenHotbar().save(token, macros);
    return true;
});

Hooks.on("controlToken", () => {
    const token = canvas.tokens.controlled[0];

    // hotbar does not yet exist on game.user.data and ui definitions, hence the casts to any.
    if (token) {
        createTokenHotbar()
            .load(token, duplicate((<any>game.user.data).hotbar), game.macros.entities)
            .then(isLoaded => {
                const hotbar = new UserHotbar(new Settings().load(game.settings), (<any>ui).hotbar, new PageFlag());
                hotbar.goToPage(isLoaded);
            });
    }
    return true;
});

Hooks.on("preDeleteToken", (_: Scene, token: any) => {
    createTokenHotbar().remove(token._id);
    return true;
});

Hooks.on("preDeleteActor", (actor: any) => {
    createTokenHotbar().remove(actor.data._id);
    return true;
});