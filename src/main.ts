import { Settings } from './settings';
import { TokenHotbar } from './hotbar/tokenHotbar';
import { CONSTANTS } from './constants';
import { HotbarFlagsFactory, FlagStrategyFactory } from './flags/factory';
import { UserHotbar } from './hotbar/userHotbar';
import { PageFlag } from './flags/pageFlag';
import { ConsoleLogger } from './logger';

// TODO: Remove in v3.0.0
function migrateFlag() {
    let oldData = game.user.getFlag("world", "token-hotbar");
    let newData = game.user.getFlag("world", CONSTANTS.moduleName);
    if (!oldData || newData) {
        console.debug("[Token Hotbar]", "Nothing to migrate.", !!oldData, !!newData);
        return;
    }

    console.info("[Token Hotbar]", "Migrating to new flag key.");

    game.user.setFlag("world", CONSTANTS.moduleName, oldData);
    game.user.unsetFlag("world", "token-hotbar");
}

function createTokenHotbar() {
    const settings = new Settings().load(game.settings);
    const hotbarFlags = new HotbarFlagsFactory(settings);
    const keyStrategy = new FlagStrategyFactory(settings, game, canvas);
    return new TokenHotbar(
        hotbarFlags.create(),
        ui.notifications,
        settings.hotbarPage,
        keyStrategy.createFlagKeyStrategy(),
        new ConsoleLogger((<any>window).TokenHotbar.debug));
}

Hooks.on("init", () => {
    ConsoleLogger.init();

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

    console.log("[Token Hotbar]", "Initialized Token Hotbar");
    setTimeout(migrateFlag, 200);
});

Hooks.on("renderHotbar", (data: any) => {
    // const macros = data.macros;
    // FIXME: due to a race condition, sometimes the wrong macros are passed.
    //        We are only interested in the ones on the token hotbar.
    //        ! Will be unnecessary to fix in v3.0.0 (separate hotbar, all pages/slots will be relevant)
    const uiHotbar = (<any>ui).hotbar;
    const settings = new Settings().load(game.settings);
    const macros = uiHotbar._getMacrosByPage(settings.hotbarPage);

    const token = canvas.tokens.controlled[0];
    if (token && settings.hotbarPage === uiHotbar.page)
        createTokenHotbar().save(token, macros, !settings.lockHotbar || game.user.isGM);
    return true;
});

Hooks.on("controlToken", async () => {
    const token = canvas.tokens.controlled[0];

    const logger = new ConsoleLogger();
    const uiHotbar = new UserHotbar(new Settings().load(game.settings), (<any>ui).hotbar, new PageFlag(), logger);

    const userMacroData = <any>game.user.data;

    if (token && canvas.tokens.controlled.length == 1) {
        // hotbar does not yet exist on game.user.data and ui definitions, hence the casts to any.
        logger.debug("[Token Hotbar]", "controlled token", token);
        let result = createTokenHotbar()
            .load(token, duplicate(userMacroData.hotbar), game.macros.entities);
        
        if (result.hasMacros) {
            await game.user.update({hotbar: result.hotbar});
            logger.debug("[Token Hotbar]", "updated hotbar", token, result.hotbar);
        }
        uiHotbar.goToPage(result.hasMacros);
    }
    else {
        uiHotbar.goToPage(false);
        logger.debug("[Token Hotbar]", "No or multiple controlled tokens");
    }
    return true;
});

Hooks.on("preDeleteToken", (_: Scene, token: any) => {
    createTokenHotbar().remove(token._id, game.actors, canvas.tokens);
    return true;
});

Hooks.on("preDeleteActor", (actor: any) => {
    createTokenHotbar().remove(actor.data._id, game.actors, canvas.tokens);
    return true;
});

Hooks.on("ready", () => {
    migrateFlag();
});