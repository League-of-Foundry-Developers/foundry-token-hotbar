import { Settings } from './utils/settings';
import { CONSTANTS } from './utils/constants';
import { UiHotbarFactory } from './hotbar/uiHotbarFactory';
import { HotbarSlots } from './hotbar/hotbar';
import { Migration, DataFlaggable } from './utils/migration';
import { ControllerFactory } from './controller';
import { TokenHotbarFactory } from './hotbar/tokenHotbarFactory';

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

Hooks.on('init', () => {
    game.settings.register(CONSTANTS.module.name, Settings.keys.hotbarPage, {
        name: 'TokenHotbar.settings.page.name',
        hint: 'TokenHotbar.settings.page.hint',
        scope: 'world',
        config: true,
        default: 5,
        type: Number,
        range: { min: 1, max: 5, step: 1 }
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
// Hooks.on('renderCustomHotbar', () => {
//     const settings = Settings._load();
//     if (!settings.useCustomHotbar)
//         return true;

//     save();
//     return true;
// });

Hooks.on('preUpdateUser', (_, updateData) => {
    const settings = Settings._load();
    if (settings.useCustomHotbar)
        return true;

    if (!updateData.hotbar)
        return true;

    save(updateData.hotbar);
    return true;
});

function save(hotbarUpdate: HotbarSlots) {
    if (renderHotbarTimeout)
        clearTimeout(renderHotbarTimeout);

    renderHotbarTimeout = window.setTimeout(() => {
        const token = canvas.tokens.controlled[0];
        if (!token)
            return;
    
        return new ControllerFactory(Settings._load())
            .create(token)
            .save(game.user, token, hotbarUpdate);

    }, 100);
}

let controlTokenTimeout: number;
Hooks.on('controlToken', () => {
    if (controlTokenTimeout)
        clearTimeout(controlTokenTimeout);

    controlTokenTimeout = window.setTimeout(() => {
        const token = canvas.tokens.controlled[0];

        const settings = Settings._load();

        if (token && canvas.tokens.controlled.length == 1)
            new ControllerFactory(settings)
                .create(token.id)
                .load();
        else {
            hideTokenHotbar();
        }
    }, 100);
});

Hooks.on('renderHotbar', () => {
    if (controlTokenTimeout)
        clearTimeout(controlTokenTimeout);

    controlTokenTimeout = window.setTimeout(() => {
        const token = canvas.tokens.controlled[0];

        if (token && canvas.tokens.controlled.length == 1)
            new ControllerFactory(Settings._load())
                .create(token.id)
                .reload();
    }, 500);
});

function hideTokenHotbar() {
    new UiHotbarFactory(Settings._load())
        .create()
        .toggleHotbar(false);

    this.logger.debug('[Token Hotbar]', 'No or multiple controlled tokens');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Hooks.on('preDeleteToken', (_: Scene, token: any) => {
    new TokenHotbarFactory()
        .create(Settings._load(), token._id)
        .removeTokenMacros(game.actors, canvas.tokens);
    return true;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Hooks.on('preDeleteActor', (actor: any) => {
    new TokenHotbarFactory()
        .create(Settings._load(), actor._id)
        .removeTokenMacros(game.actors, canvas.tokens);
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
