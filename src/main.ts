import { Settings } from './utils/settings';
import { CONSTANTS } from './utils/constants';
import { UiHotbarFactory } from './hotbar/uiHotbarFactory';
import { HotbarSlots } from './hotbar/hotbar';
import { Migration, DataFlaggable } from './utils/migration';
import { ControllerFactory } from './controller';
import { TokenHotbarFactory } from './hotbar/tokenHotbarFactory';
import { ConsoleLogger } from './utils/logger';
import { IToken } from './utils/foundry';

// TODO: Remove in v4.0.0
async function migrateFlags() {
    if (!game.user.isGM || game.user.getFlag(CONSTANTS.module.name, 'v3.0.4 migration')) {
        return;
    }
    const noteText = 'Starting Token Hotbar migration, please wait...';
    (<any>ui.notifications).warn(noteText, { permanent: true });
    const tokens: DataFlaggable[] = game.scenes.entities
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    } else {
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

    const hasCustomHotbar = game.modules.get('custom-hotbar').active; 
    game.settings.register(CONSTANTS.module.name, Settings.keys.useCustomHotbar, {
        name: 'TokenHotbar.settings.useCustomHotbar.name',
        hint: 'TokenHotbar.settings.useCustomHotbar.hint',
        scope: 'world',
        config: hasCustomHotbar,
        default: false,
        type: Boolean
    });
    if (!hasCustomHotbar) {
        // ensure useCustomHotbar is unchecked when module is disabled.
        // even though the settings also should fall back!
        game.settings.set(CONSTANTS.module.name, Settings.keys.useCustomHotbar, false);
    }

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

Hooks.on('preUpdateUser', (_, updateData: { hotbar?: HotbarSlots, flags?: { 'custom-hotbar': { 'chbMacroMap': HotbarSlots } } }) => {
    const chbFlag = 'custom-hotbar';
    const chbKey = 'chbMacroMap';
    const settings = Settings._load();
    // TODO: move this logic to its own class?
    if (!settings.useCustomHotbar && !updateData.hotbar)
        return true;

    if (settings.useCustomHotbar && (!updateData.flags || !updateData.flags[chbFlag] || !updateData.flags[chbFlag][chbKey]))
        return true;

    if (renderHotbarTimeout)
        clearTimeout(renderHotbarTimeout);

    renderHotbarTimeout = window.setTimeout(() => {
        const token: IToken | undefined = canvas.tokens.controlled[0];
        if (!token)
            return;
    
        return new ControllerFactory(Settings._load())
            .create(token)
            // `updateData` is already checked to be contain the appropriate data
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .save(game.user, settings.useCustomHotbar ? updateData.flags![chbFlag][chbKey] : updateData.hotbar!);

    }, 30);
    return true;
});

let controlTokenTimeout: number;
Hooks.on('controlToken', () => {
    if (controlTokenTimeout)
        clearTimeout(controlTokenTimeout);

    controlTokenTimeout = window.setTimeout(() => {
        const token: IToken | undefined = canvas.tokens.controlled[0];

        const settings = Settings._load();

        if (token && canvas.tokens.controlled.length == 1)
            new ControllerFactory(settings)
                .create(token)
                .load();
        else {
            new UiHotbarFactory(settings)
                .create()
                .toggleHotbar(false);

            new ConsoleLogger(settings).debug('[Token Hotbar]', 'No or multiple controlled tokens');
        }
    }, 30);
});

let sharedRenderTimeout: number;
Hooks.on('updateActor', (actor, data) => {
    reload(actor.id, data);
    return true;
});

Hooks.on('updateToken', (token, data) => {
    reload(token.id, data);
    return true;
});

function reload(entityId: string, flags: any) {
    const settings = Settings._load();
    const token: IToken | undefined = canvas.tokens.controlled[0];

    // check if we should reload anything
    if (canvas.tokens.controlled.length != 1 || !settings.shareHotbar || !flags[CONSTANTS.module.name])
        return true;

    // check if selected token is equal to the updated token
    if (token?.id != entityId && token?.actor?.id != entityId)
        return true;

    if (sharedRenderTimeout)
        clearTimeout(sharedRenderTimeout);

    sharedRenderTimeout = window.setTimeout(() => {
        new ControllerFactory(Settings._load())
            .create(token)
            .reload();
    }, 30);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Hooks.on('preDeleteToken', (_: Scene, token: any) => {
    new TokenHotbarFactory(Settings._load())
        .create(token._id)
        .removeTokenMacros(game.actors, canvas.tokens);
    return true;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Hooks.on('preDeleteActor', (actor: any) => {
    new TokenHotbarFactory(Settings._load())
        .create(actor._id)
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
