import { Settings } from './utils/settings';
import { TokenHotbar } from './hotbar/tokenHotbar';
import { CONSTANTS } from './utils/constants';
import { HotbarFlagsFactory, FlagStrategyFactory } from './flags/factory';
import { UiHotbar, calculatePageSlots } from './hotbar/uiHotbar';
import { UiHotbarFactory } from './hotbar/uiHotbarFactory';
import { ConsoleLogger, Logger } from './utils/logger';
import { IToken } from './utils/foundry';
import { Hotbar } from './hotbar/hotbar';
import { Migration, DataFlaggable } from './utils/migration';

// TODO: Remove in v4.0.0
async function migrateFlags() {
    if (!game.user.isGM || game.user.getFlag(CONSTANTS.moduleName, 'v3.0.4 migration')) {
        return;
    }
    const noteText = 'Starting Token Hotbar migration, please wait...';
    ui.notifications.warn(noteText);
    const tokens: DataFlaggable[] = game.scenes.entities
        .map(scene => (<any>scene.data).tokens.map(data => new Token(data, scene)))
        .deepFlatten();
    const actors = game.actors.entities;
    const users = game.users.entities;

    const flaggables = tokens.concat(actors).concat(users);
    const errors = await new Migration(flaggables).migrate();

    if (errors.length > 0) {
        console.error('[Token Hotbar]', 'Migration errors:');
        errors.map(e => console.error(e));
        ui.notifications.error('Something went wrong during the migration. Please send the errors from console (F12) to @Stan#1549 on Discord.');
    }
    else {
        game.user.setFlag(CONSTANTS.moduleName, 'v3.0.4 migration', true);
        ui.notifications.info('Token Hotbar migration finished.');
    }
    setTimeout(() => { // prevent flickering notifications
        ui.notifications.active.find(() => ui.notifications.active.find(n => n.text() == noteText)).remove();
    }, 800);
}

function createTokenHotbar(tokenId: string): TokenHotbar {
    const settings = Settings._load();
    const hotbarFlags = new HotbarFlagsFactory(settings);
    const keyStrategy = new FlagStrategyFactory(settings, game, canvas);
    return new TokenHotbar(
        tokenId,
        game.macros.entities,
        hotbarFlags.create(),
        keyStrategy.createFlagKeyStrategy(),
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
Hooks.on('renderCustomHotbar', () => {
    const settings = Settings._load();
    if (!settings.useCustomHotbar)
        return true;

    save();
    return true;
});

Hooks.on('renderHotbar', () => {
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

    // TODO: put this inside a nice class
    function delayedSave() {
        const settings = Settings._load();
        const factory = new UiHotbarFactory(settings);
        const uiHotbar = factory.create();
        const token = canvas.tokens.controlled[0];

        if (token && uiHotbar.shouldUpdateTokenHotbar()) {
            const tokenHotbar = createTokenHotbar(token.id);
            const hotbarPage = uiHotbar.getTokenHotbarPage();
            const slots = calculatePageSlots(hotbarPage);
            const macros = uiHotbar.getMacrosByPage(hotbarPage);
            const tokenMacros = tokenHotbar.getMacrosByPage(hotbarPage);
            if (slots.some(slot => macros.hotbar[slot] !== tokenMacros.hotbar[slot])) {
                if (game.user.isGM || !settings.lockHotbar)
                    tokenHotbar.setTokenMacros(hotbarPage, macros);
                else
                    ui.notifications.warn('The token hotbar is locked for players. Any macros placed on this page will be replaced.');
            }
        }

        return true;
    }
}

let controlTokenTimeout: number;
Hooks.on('controlToken', () => {
    if (controlTokenTimeout)
        clearTimeout(controlTokenTimeout);

    controlTokenTimeout = window.setTimeout(delayedLoad, 35);
});

// TODO: put this inside a nice class
async function delayedLoad() {
    const token = canvas.tokens.controlled[0];

    const settings = Settings._load();
    const logger = new ConsoleLogger(settings);
    const factory = new UiHotbarFactory(settings);
    const uiHotbar = factory.create();

    if (token && canvas.tokens.controlled.length == 1)
        loadTokenHotbar(logger, token, uiHotbar);
    else {
        hideTokenHotbar(logger, uiHotbar);
    }

    return true;
}

async function loadTokenHotbar(logger: Logger, token: IToken, uiHotbar: UiHotbar & Hotbar) {
    const hotbarPage = uiHotbar.getTokenHotbarPage();
    const result = createTokenHotbar(token.id).getMacrosByPage(hotbarPage);
    await uiHotbar.setTokenMacros(hotbarPage, result);

    logger.debug('[Token Hotbar]', 'updated hotbar', token, result.hotbar);

    const macros = Object.values(result.hotbar);
    uiHotbar.toggleHotbar(macros.length > 0 && macros.every(macro => !!macro));
}

function hideTokenHotbar(logger: Logger, uiHotbar: UiHotbar & Hotbar) {
    uiHotbar.toggleHotbar(false);
    logger.debug('[Token Hotbar]', 'No or multiple controlled tokens');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Hooks.on('preDeleteToken', (_: Scene, token: any) => {
    createTokenHotbar(token._id).removeTokenMacros(game.actors, canvas.tokens);
    return true;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
