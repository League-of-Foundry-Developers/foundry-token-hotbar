import { Settings } from './utils/settings';
import { CONSTANTS } from './utils/constants';
import { UiHotbarFactory } from './hotbar/uiHotbarFactory';
import { HotbarSlots } from './hotbar/hotbar';
import { ControllerFactory } from './controller';
import { TokenHotbarFactory } from './hotbar/tokenHotbarFactory';
import { ConsoleLogger } from './utils/logger';
import { IToken, Socket, Macro } from './utils/foundry';
import { FlagStrategyFactory } from './flags/factory';

Hooks.on('init', () => {
    const hasCustomHotbar = game.modules.get('custom-hotbar')?.active;
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

    game.settings.register(CONSTANTS.module.name, Settings.keys.hotbarPage, {
        name: 'TokenHotbar.settings.page.name',
        hint: 'TokenHotbar.settings.page.hint',
        scope: 'world',
        config: !game.settings.get(CONSTANTS.module.name, Settings.keys.useCustomHotbar),
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

// preUpdateUser no longer triggers on regular Hotbar updates, but removing this seems to break compatibility with Norc's Custom Hotbar
Hooks.on('preUpdateUser', (_, updateData: { flags?: { 'custom-hotbar': { 'chbMacroMap': HotbarSlots } } }) => {
    const chbFlag = 'custom-hotbar';
    const chbKey = 'chbMacroMap';
    const settings = Settings._load();

    const token: IToken | undefined = canvas.tokens.controlled[0];
    const controller = new ControllerFactory(Settings._load()).create(token);

    if (settings.useCustomHotbar && (updateData.flags?.[chbFlag]?.[chbKey]))
        controller.save(game.user, token?.id, updateData.flags[chbFlag][chbKey]);

    return true;
});

// Switched from preUpdateUser since 0.7.7, seems to fix issues but might cause new issues.
// This has not been thoroughly tested yet.
// Note to future developers: document *why* you (do not) use specific hooks, it will help you future self.
Hooks.on('updateUser', (_, updateData: { hotbar?: HotbarSlots }) => {
    const settings = Settings._load();

    const token: IToken | undefined = canvas.tokens.controlled[0];
    const controller = new ControllerFactory(Settings._load()).create(token);

    if (!settings.useCustomHotbar && updateData.hotbar)
        controller.save(game.user, token?.id, updateData.hotbar);

    return true;
});

let controlTokenTimeout: number;
Hooks.on('controlToken', () => {
    if (controlTokenTimeout)
        clearTimeout(controlTokenTimeout);

    // use a time-out, to prevent flickering/race conditions when multiple tokens are selected.
    controlTokenTimeout = window.setTimeout(() => {
        const token: IToken | undefined = canvas.tokens.controlled[0];

        const settings = Settings._load();

        new ControllerFactory(settings)
            .create(token)
            .load();
    }, 100);
});

let sharedRenderTimeout: number;
function reload(tokenId: string) {
    const token: IToken | undefined = canvas.tokens.controlled[0];
    if (!token) return;

    const settings = Settings._load();
    const strategy = new FlagStrategyFactory(settings, game, canvas)
        .createFlagStrategy();

    // check if we should reload anything
    if (canvas.tokens.controlled.length != 1 || !settings.shareHotbar)
        return true;

    // check if selected token is equal to the updated token
    if(strategy.get(tokenId).id !== strategy.get(token.id).id)
        return true;

    if (sharedRenderTimeout)
        clearTimeout(sharedRenderTimeout);

    sharedRenderTimeout = window.setTimeout(() => {
        new ControllerFactory(Settings._load())
            .create(token)
            .reload();
    }, 100);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Hooks.on('preDeleteToken', (_: Scene, token: any) => {
    // TODO: reload on socket, but make sure you don't respond to your own socket message (singleton + messageIds?)
    new TokenHotbarFactory(Settings._load())
        .createRemover(token._id)
        .removeTokenMacros(game.actors, canvas.tokens);
    return true;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Hooks.on('preDeleteActor', (actor: any) => {
    new TokenHotbarFactory(Settings._load())
        .createRemover(actor._id)
        .removeTokenMacros(game.actors, canvas.tokens);
    return true;
});

Hooks.on('ready', () => {
    (<Socket><unknown>game.socket).on('module.TokenHotbar', msg => {
        new ConsoleLogger(Settings._load()).debug('Token Hotbar | Message received', msg);
        if (msg.type === 'updateTokenHotbar')
            reload(msg.tokenId);
    });
});

Hooks.once('renderCustomHotbar', () => {
    // on first render, check if it should be expanded or collapsed.
    const settings = Settings._load();
    const factory = new UiHotbarFactory(settings);
    factory.create().toggleHotbar(canvas.tokens.controlled.length === 1);
});
