import { Settings } from './settings';
import { TokenHotbar } from './hotbar/tokenHotbar';
import { CONSTANTS } from './constants';
import { HotbarFlagsFactory, FlagStrategyFactory } from './flags/factory';
import { CustomHotbar, UiHotbar } from './hotbar/uiHotbar';
import { UiHotbarFactory } from './hotbar/uiHotbarFactory';
import { ConsoleLogger, Logger } from './logger';
import { IToken, Flaggable } from './foundry';
import { Hotbar, HotbarSlots } from './hotbar/hotbar';
import { OldHotbarData, HotbarData } from './flags/hotbarFlags';

// TODO: Remove in v4.0.0
async function migrateFlags() {
    if (!game.user.isGM || game.user.getFlag(CONSTANTS.moduleName, 'v3.0.4 migration')) {
        return;
    }
    ui.notifications.warn('Starting Token Hotbar migration, please wait...');
    try {
        const tokens: Flaggable[] = game.scenes.entities.map(scene => (<any>scene.data).tokens).deepFlatten().map(data => new Token(data));
        const actors = game.actors.entities;
        const users  = game.users.entities;

        for(let flaggable of tokens.concat(actors).concat(users)) {
            const newFlags = ((<any>flaggable).data.flags[CONSTANTS.moduleName]);
            if (newFlags) {
                continue;
            }

            const oldFlags = (<any>flaggable).data.flags.world?.[CONSTANTS.moduleName];
            if (oldFlags) {
                for(let key in oldFlags) {
                    const newData = translateDataStructure(oldFlags[key]);
                    await flaggable.setFlag(CONSTANTS.moduleName, key, newData);
                    await flaggable.unsetFlag('world', CONSTANTS.moduleName);
                    await delay(50); // prevent race conditions
                }
            }
        }
    }
    catch {
        ui.notifications.error('Something went wrong during the migration. Please check your console and notify @Stan on Discord.');
    }

    game.user.setFlag(CONSTANTS.moduleName, 'v3.0.4 migration', true)
    ui.notifications.info('Token Hotbar migration finished.');
}

function translateDataStructure(oldData: OldHotbarData) {
    const newData: HotbarData = {};
    for(let id in oldData) {
        newData[id] = oldData[id].reduce<HotbarSlots>((acc, cur) => { acc[cur.slot] = cur.id; return acc; }, {});
    }
    return newData;
}

function delay(timeoutMs) {
    return new Promise(resolve => {
        setTimeout(resolve, timeoutMs);
    });
}

function createTokenHotbar(tokenId: string) {
    const settings = Settings._load();
    const hotbarFlags = new HotbarFlagsFactory(settings);
    const keyStrategy = new FlagStrategyFactory(settings, game, canvas);
    return new TokenHotbar(
        tokenId,
        game.macros.entities,
        hotbarFlags.create(),
        keyStrategy.createFlagKeyStrategy(),
        settings,
        new ConsoleLogger(settings));
}

Hooks.on('init', () => {
    game.settings.register(CONSTANTS.moduleName, Settings.keys.hotbarPage, {
        name: 'Page',
        hint: 'The hotbar page that will be replaced with the token hotbar. Changing this will wipe existing token bars!',
        scope: 'world',
        config: true,
        default: 5,
        type: Number,
        choices: {
            1: 'Page 1',
            2: 'Page 2',
            3: 'Page 3',
            4: 'Page 4',
            5: 'Page 5'
        }
    });

    game.settings.register(CONSTANTS.moduleName, Settings.keys.linkToLinkedActor, {
        name: 'Link to linked actor',
        hint: 'Link the token hotbar to the actor if the token is linked.',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register(CONSTANTS.moduleName, Settings.keys.alwaysLinkToActor, {
        name: 'Always link to actor',
        hint: 'Link the token hotbar to the actor even if the token is unlinked.',
        scope: 'world',
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register(CONSTANTS.moduleName, Settings.keys.shareHotbar, {
        name: 'Share the hotbar with other players',
        hint: 'When set every token will have a single hotbar shared by all players.',
        scope: 'world',
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register(CONSTANTS.moduleName, Settings.keys.lockHotbar, {
        name: 'Lock shared hotbar',
        hint: 'When set, only a GM can update the token hotbar. Only applies to shared hotbars.',
        scope: 'world',
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register(CONSTANTS.moduleName, Settings.keys.useCustomHotbar, {
        name: 'Use Norc\'s Custom Hotbar',
        hint: 'When set, Token Hotbar will use a separate hotbar. Requires the Custom Hotbar by Norc.',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register(CONSTANTS.moduleName, Settings.keys.debugMode, {
        name: 'Debug Mode',
        hint: 'When set, Token Hotbar will log verbosely to the console.',
        scope: 'client',
        config: true,
        default: false,
        type: Boolean
    });

    console.log('[Token Hotbar]', 'Initialized Token Hotbar');
});

let renderHotbarTimeout: number;
Hooks.on('renderCustomHotbar', (data: any) => {
    const settings = Settings._load();
    if (!settings.useCustomHotbar)
        return true;

    save();
    return true;
});

Hooks.on('renderHotbar', (data: any) => {
    const settings = Settings._load();
    if (settings.useCustomHotbar)
        return true;

    save();
    return true;
});

function save() {
    if (renderHotbarTimeout)
        clearTimeout(renderHotbarTimeout);

    renderHotbarTimeout = window.setTimeout(delayedSave, 35);

    function delayedSave() {
        // const macros = data.macros;
        // FIXME: due to a race condition, sometimes the wrong macros are passed.
        //        We are only interested in the ones on the token hotbar.
        //        ! Will be unnecessary to fix in v3.0.0 (separate hotbar, all pages/slots will be relevant)
        const settings = Settings._load();
        const factory = new UiHotbarFactory(settings);
        const uiObject = factory.getFoundryUiObject();
        const uiHotbar = factory.create();
        const token = canvas.tokens.controlled[0];

        if (token && settings.hotbarPage === uiObject.page)
            createTokenHotbar(token.id).setTokenMacros(uiHotbar.getTokenMacros());

        return true;
    }
}

let controlTokenTimeout: number;
Hooks.on('controlToken', () => {
    if (controlTokenTimeout)
        clearTimeout(controlTokenTimeout);

    controlTokenTimeout = window.setTimeout(delayedLoad, 35);

    async function delayedLoad() {
        const token = canvas.tokens.controlled[0];

        const settings = Settings._load();
        const logger = new ConsoleLogger(settings);
        const factory = new UiHotbarFactory(settings);
        const uiHotbar = factory.create();

        if (token && canvas.tokens.controlled.length == 1)
            loadTokenHotbar(logger, token, uiHotbar);
        else
            hideTokenHotbar(logger, uiHotbar);

        return true;
    }

    async function loadTokenHotbar(logger: Logger, token: IToken, uiHotbar: UiHotbar & Hotbar) {
        const result = createTokenHotbar(token.id).getTokenMacros();
        await uiHotbar.setTokenMacros(result);

        logger.debug('[Token Hotbar]', 'updated hotbar', token, result.hotbar);

        uiHotbar.toggleHotbar(Object.values(result).every(macro => macro));
    }

    function hideTokenHotbar(logger: Logger, uiHotbar: UiHotbar & Hotbar) {
        uiHotbar.toggleHotbar(false);
        logger.debug('[Token Hotbar]', 'No or multiple controlled tokens');
    }
});

Hooks.on('preDeleteToken', (_: Scene, token: any) => {
    createTokenHotbar(token._id).removeTokenMacros(game.actors, canvas.tokens);
    return true;
});

Hooks.on('preDeleteActor', (actor: any) => {
    createTokenHotbar(actor._id).removeTokenMacros(game.actors, canvas.tokens);
    return true;
});

Hooks.on('ready', () => {
    migrateFlags();
});

Hooks.once('renderCustomHotbar', () => {
    // on first render, check if it should be expanded or collapsed.
    const settings = Settings._load();
    const factory = new UiHotbarFactory(settings);
    factory.create().toggleHotbar(canvas.tokens.controlled.length === 1);
});
