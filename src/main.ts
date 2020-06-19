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
    if (!game.user.isGM || game.user.getFlag(CONSTANTS.module.name, 'v3.0.4 migration')) {
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
        game.user.setFlag(CONSTANTS.module.name, 'v3.0.4 migration', true);
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
    game.settings.register(CONSTANTS.module.name, Settings.keys.hotbarPage, {
        name: 'TokenHotbar.settings.page.name',
        hint: 'TokenHotbar.settings.page.hint',
        scope: 'world',
        config: true,
        default: 5,
        type: Number,
        choices: {
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5'
        }
    });

    game.settings.register(CONSTANTS.module.name, Settings.keys.linkToLinkedActor, {
        name: 'TokenHotbar.settings.linkToActor.name',
        hint: 'TokenHotbar.settings.linkToActor.hint',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register(CONSTANTS.module.name, Settings.keys.alwaysLinkToActor, {
        name: 'TokenHotbar.settings.alwaysLinkToActor.name',
        hint: 'TokenHotbar.settings.alwaysLinkToActor.hint',
        scope: 'world',
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register(CONSTANTS.module.name, Settings.keys.shareHotbar, {
        name: 'TokenHotbar.settings.shareHotbar.name',
        hint: 'TokenHotbar.settings.shareHotbar.hint',
        scope: 'world',
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register(CONSTANTS.module.name, Settings.keys.lockHotbar, {
        name: 'TokenHotbar.settings.lockHotbar.name',
        hint: 'TokenHotbar.settings.lockHotbar.hint',
        scope: 'world',
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register(CONSTANTS.module.name, Settings.keys.useCustomHotbar, {
        name: 'TokenHotbar.settings.useCustomHotbar.name',
        hint: 'TokenHotbar.settings.useCustomHotbar.hint',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register(CONSTANTS.module.name, Settings.keys.debugMode, {
        name: 'TokenHotbar.settings.debugMode.name',
        hint: 'TokenHotbar.settings.debugMode.hint',
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
    async function delayedSave() {
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
                if (game.user.isGM || !settings.lockHotbar) {
                    await tokenHotbar.setTokenMacros(hotbarPage, macros);
                    if (settings.shareHotbar) {
                        setTimeout(() => {
                            (<any>game.socket).emit(`module.${CONSTANTS.module.name}`, {
                                type: CONSTANTS.socket.redrawSharedHotbar
                            });
                        }, 250); // slight delay to ensure flags are synchronized to the other client(s).
                    }
                } else
                    ui.notifications.warn(game.i18n.localize('TokenHotbar.notifications.lockedWarning'));
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

    (<any>game.socket).on(`module.${CONSTANTS.module.name}`, data => {
        if (data.type === CONSTANTS.socket.redrawSharedHotbar) {
            const settings = Settings._load();
            const hotbar = new UiHotbarFactory(settings).create();
            if (settings.shareHotbar && hotbar.shouldUpdateTokenHotbar())
                delayedLoad();
        }
    });
});

Hooks.once('renderCustomHotbar', () => {
    // on first render, check if it should be expanded or collapsed.
    const settings = Settings._load();
    const factory = new UiHotbarFactory(settings);
    factory.create().toggleHotbar(canvas.tokens.controlled.length === 1);
});
