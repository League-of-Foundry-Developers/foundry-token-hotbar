import 'jasmine';
import { Settings } from '../src/utils/settings';
import { TokenHotbarController } from '../src/controller';
import { ConsoleLogger } from '../src/utils/logger';
import { User } from '../src/utils/foundry';
import { TestSocket } from './helpers/TestSocket';

// TODO: use something like a builder pattern or default mock setup to reduce the duplication of mock setup.

const socket = new TestSocket();

describe('controller.load', function () {
    it('sets the token hotbar macros on the ui hotbar', async function() {
        const settings = new Settings();
        const uiHotbar = jasmine.createSpyObj(
            'UiHotbar', [ 'getTokenHotbarPage', 'toggleHotbar', 'setTokenMacros' ]);
        const page = 5;
        uiHotbar.getTokenHotbarPage.and.returnValue(page);
        
        const tokenHotbar = jasmine.createSpyObj('TokenHotbar', [ 'getMacrosByPage' ]);
        const tokenMacros = { hotbar: { 41: 'some-macro' } };
        tokenHotbar.getMacrosByPage.and.returnValue(tokenMacros);

        const controller = new TokenHotbarController(
            settings,
            uiHotbar,
            socket,
            tokenHotbar,
            new ConsoleLogger(settings));

        // Act
        await controller.load();

        // Assert
        expect(uiHotbar.setTokenMacros).toHaveBeenCalledWith(page, tokenMacros);
    });

    it('calls toggleHotbar(true) if there are macros', async function() {
        const settings = new Settings();
        const uiHotbar = jasmine.createSpyObj(
            'UiHotbar', [ 'getTokenHotbarPage', 'toggleHotbar', 'setTokenMacros' ]);
        
        const tokenHotbar = jasmine.createSpyObj('TokenHotbar', [ 'getMacrosByPage' ]);
        tokenHotbar.getMacrosByPage.and.returnValue({ hotbar: { 41: 'some-macro' } });

        const controller = new TokenHotbarController(
            settings,
            uiHotbar,
            socket,
            tokenHotbar,
            new ConsoleLogger(settings));

        // Act
        await controller.load();

        // Assert
        expect(uiHotbar.toggleHotbar).toHaveBeenCalledWith(true);
    });

    it('calls toggleHotbar(false) if there are no macros', async function() {
        const settings = new Settings();
        const uiHotbar = jasmine.createSpyObj(
            'UiHotbar', [ 'getTokenHotbarPage', 'toggleHotbar', 'setTokenMacros' ]);
        
        const tokenHotbar = jasmine.createSpyObj('TokenHotbar', [ 'getMacrosByPage' ]);
        tokenHotbar.getMacrosByPage.and.returnValue({ hotbar: {} });

        const controller = new TokenHotbarController(
            settings,
            uiHotbar,
            socket,
            tokenHotbar,
            new ConsoleLogger(settings));

        // Act
        await controller.load();

        // Assert
        expect(uiHotbar.toggleHotbar).toHaveBeenCalledWith(false);
    });

    it('calls toggleHotbar(false) if the macros are null or undefined', async function() {
        const settings = new Settings();
        const uiHotbar = jasmine.createSpyObj(
            'UiHotbar', [ 'getTokenHotbarPage', 'toggleHotbar', 'setTokenMacros' ]);
        
        const tokenHotbar = jasmine.createSpyObj('TokenHotbar', [ 'getMacrosByPage' ]);
        tokenHotbar.getMacrosByPage.and.returnValue({ hotbar: { 41: undefined, 42: null } });

        const controller = new TokenHotbarController(
            settings,
            uiHotbar,
            socket,
            tokenHotbar,
            new ConsoleLogger(settings));

        // Act
        await controller.load();

        // Assert
        expect(uiHotbar.toggleHotbar).toHaveBeenCalledWith(false);
    });
});

describe('controller.reload', function () {
    it('calls controller.load if the current page is the token hotbar page and there are changes', async function() {
        const settings = new Settings();

        const page = 5;
        const uiMacros = { hotbar: { } };
        const uiHotbar = jasmine.createSpyObj(
            'UiHotbar', [ 'getTokenHotbarPage', 'currentPage', 'getMacrosByPage' ]);
        uiHotbar.getTokenHotbarPage.and.returnValue(page);
        uiHotbar.currentPage.and.returnValue(page);
        uiHotbar.getMacrosByPage.and.returnValue(uiMacros);
        
        const tokenMacros = { hotbar: { 41: 'some-macro' } };
        const tokenHotbar = jasmine.createSpyObj('TokenHotbar', [ 'getMacrosByPage' ]);
        tokenHotbar.getMacrosByPage.and.returnValue(tokenMacros);

        const controller = new TokenHotbarController(
            settings,
            uiHotbar,
            socket,
            tokenHotbar,
            new ConsoleLogger(settings));

        spyOn(controller, 'load');

        // Act
        await controller.reload();

        // Assert
        expect(controller.load).toHaveBeenCalled();
    });

    it('does not call controller.load if the current page is not the token hotbar page', async function() {
        const settings = new Settings();

        const page = 5;
        const uiHotbar = jasmine.createSpyObj(
            'UiHotbar', [ 'getTokenHotbarPage', 'currentPage', 'getMacrosByPage' ]);
        uiHotbar.getTokenHotbarPage.and.returnValue(page);
        uiHotbar.currentPage.and.returnValue(page - 1);
        
        const tokenHotbar = jasmine.createSpyObj('TokenHotbar', [ 'getMacrosByPage' ]);

        const controller = new TokenHotbarController(
            settings,
            uiHotbar,
            socket,
            tokenHotbar,
            new ConsoleLogger(settings));

        spyOn(controller, 'load');

        // Act
        await controller.reload();

        // Assert
        expect(controller.load).not.toHaveBeenCalled();
    });

    it('does not call controller.load if the there are no changes', async function() {
        const settings = new Settings();

        const page = 5;
        const macros = { hotbar: { 41: 'some-macro' } };
        const uiHotbar = jasmine.createSpyObj(
            'UiHotbar', [ 'getTokenHotbarPage', 'currentPage', 'getMacrosByPage' ]);
        uiHotbar.getTokenHotbarPage.and.returnValue(page);
        uiHotbar.currentPage.and.returnValue(page);
        uiHotbar.getMacrosByPage.and.returnValue(macros);
        
        const tokenHotbar = jasmine.createSpyObj('TokenHotbar', [ 'getMacrosByPage' ]);
        tokenHotbar.getMacrosByPage.and.returnValue(macros);

        const controller = new TokenHotbarController(
            settings,
            uiHotbar,
            socket,
            tokenHotbar,
            new ConsoleLogger(settings));

        spyOn(controller, 'load');

        // Act
        await controller.reload();

        // Assert
        expect(controller.load).not.toHaveBeenCalled();
    });
});

describe('controller.save', function () {
    it('calls TokenHotbar.setTokenMacros if on token hotbar page, has changes and is not locked', async function() {
        const settings = new Settings();
        settings.lockHotbar = false;

        const page = 5;

        const uiMacros = { hotbar: { } };
        const uiHotbar = jasmine.createSpyObj(
            'UiHotbar', [ 'getTokenHotbarPage', 'onTokenHotbarPage', 'getMacrosByPage', 'offset' ]);
        uiHotbar.getTokenHotbarPage.and.returnValue(page);
        uiHotbar.getMacrosByPage.and.returnValue(uiMacros);
        uiHotbar.onTokenHotbarPage.and.returnValue(true);
        
        const tokenMacros = { hotbar: { } };
        const tokenHotbar = jasmine.createSpyObj('TokenHotbar', [ 'getMacrosByPage', 'setTokenMacros' ]);
        tokenHotbar.getMacrosByPage.and.returnValue(tokenMacros);

        const updates = { 41: 'some-macro' };
        uiHotbar.offset.and.returnValue(updates);

        const controller = new TokenHotbarController(
            settings,
            uiHotbar,
            socket,
            tokenHotbar,
            new ConsoleLogger(settings));

        spyOn(controller, 'load');

        // Act
        await controller.save(<User>{ isGM: false }, 'token-id', updates);

        // Assert
        expect(tokenHotbar.setTokenMacros).toHaveBeenCalled();
    });

    it('calls TokenHotbar.setTokenMacros if on token hotbar page, has changes and user is GM', async function() {
        const settings = new Settings();
        settings.lockHotbar = true;

        const page = 5;

        const uiMacros = { hotbar: { } };
        const uiHotbar = jasmine.createSpyObj(
            'UiHotbar', [ 'getTokenHotbarPage', 'onTokenHotbarPage', 'getMacrosByPage', 'offset' ]);
        uiHotbar.getTokenHotbarPage.and.returnValue(page);
        uiHotbar.getMacrosByPage.and.returnValue(uiMacros);
        uiHotbar.onTokenHotbarPage.and.returnValue(true);
        
        const tokenMacros = { hotbar: { } };
        const tokenHotbar = jasmine.createSpyObj('TokenHotbar', [ 'getMacrosByPage', 'setTokenMacros' ]);
        tokenHotbar.getMacrosByPage.and.returnValue(tokenMacros);

        const updates = { 41: 'some-macro' };
        uiHotbar.offset.and.returnValue(updates);

        const controller = new TokenHotbarController(
            settings,
            uiHotbar,
            socket,
            tokenHotbar,
            new ConsoleLogger(settings));

        spyOn(controller, 'load');

        // Act
        await controller.save(<User>{ isGM: true }, 'token-id', updates);

        // Assert
        expect(tokenHotbar.setTokenMacros).toHaveBeenCalled();
    });

    it('calls socket.emit if on token hotbar page, has changes and user is GM', async function() {
        const settings = new Settings();
        settings.lockHotbar = true;

        const page = 5;

        const uiMacros = { hotbar: { } };
        const uiHotbar = jasmine.createSpyObj(
            'UiHotbar', [ 'getTokenHotbarPage', 'onTokenHotbarPage', 'getMacrosByPage', 'offset' ]);
        uiHotbar.getTokenHotbarPage.and.returnValue(page);
        uiHotbar.getMacrosByPage.and.returnValue(uiMacros);
        uiHotbar.onTokenHotbarPage.and.returnValue(true);

        spyOn(socket, 'emit');
        
        const tokenMacros = { hotbar: { } };
        const tokenHotbar = jasmine.createSpyObj('TokenHotbar', [ 'getMacrosByPage', 'setTokenMacros' ]);
        tokenHotbar.getMacrosByPage.and.returnValue(tokenMacros);

        const updates = { 41: 'some-macro' };
        uiHotbar.offset.and.returnValue(updates);

        const controller = new TokenHotbarController(
            settings,
            uiHotbar,
            socket,
            tokenHotbar,
            new ConsoleLogger(settings));

        spyOn(controller, 'load');

        // Act
        await controller.save(<User>{ isGM: true, id: 'user-id' }, 'token-id', updates);

        // Assert
        expect(socket.emit).toHaveBeenCalledTimes(1);
        expect(socket.emit).toHaveBeenCalledWith('module.TokenHotbar', {
            type: 'updateTokenHotbar',
            tokenId: 'token-id',
            userId: 'user-id'
        });
    });

    it('does not call TokenHotbar.setTokenMacros if on token hotbar page, has changes, is locked user is not GM', async function() {
        const settings = new Settings();
        settings.lockHotbar = true;

        const page = 5;

        const uiMacros = { hotbar: { } };
        const uiHotbar = jasmine.createSpyObj(
            'UiHotbar', [ 'getTokenHotbarPage', 'onTokenHotbarPage', 'getMacrosByPage', 'offset' ]);
        uiHotbar.getTokenHotbarPage.and.returnValue(page);
        uiHotbar.getMacrosByPage.and.returnValue(uiMacros);
        uiHotbar.onTokenHotbarPage.and.returnValue(true);
        
        const tokenMacros = { hotbar: { } };
        const tokenHotbar = jasmine.createSpyObj('TokenHotbar', [ 'getMacrosByPage', 'setTokenMacros' ]);
        tokenHotbar.getMacrosByPage.and.returnValue(tokenMacros);

        const updates = { 41: 'some-macro' };
        uiHotbar.offset.and.returnValue(updates);

        const controller = new TokenHotbarController(
            settings,
            uiHotbar,
            socket,
            tokenHotbar,
            new ConsoleLogger(settings));

        spyOn(controller, 'load');

        // Act
        // await controller.save(<User>{ isGM: false }, updates);
        // TODO: inject ui
        await expectAsync(controller.save(<User>{ isGM: false }, 'token-id', updates)).toBeRejected();

        // Assert
        // expect(tokenHotbar.setTokenMacros).toHaveBeenCalled();
    });

    it('does not call TokenHotbar.setTokenMacros if on token hotbar page, but has not changes', async function() {
        const settings = new Settings();
        settings.lockHotbar = false;

        const page = 5;

        const uiMacros = { hotbar: { } };
        const uiHotbar = jasmine.createSpyObj(
            'UiHotbar', [ 'getTokenHotbarPage', 'onTokenHotbarPage', 'getMacrosByPage', 'offset' ]);
        uiHotbar.getTokenHotbarPage.and.returnValue(page);
        uiHotbar.getMacrosByPage.and.returnValue(uiMacros);
        uiHotbar.onTokenHotbarPage.and.returnValue(true);
        
        const tokenMacros = { hotbar: { 41: 'some-macro' } };
        const tokenHotbar = jasmine.createSpyObj('TokenHotbar', [ 'getMacrosByPage', 'setTokenMacros' ]);
        tokenHotbar.getMacrosByPage.and.returnValue(tokenMacros);

        const updates = tokenMacros;
        uiHotbar.offset.and.returnValue(updates.hotbar);

        const controller = new TokenHotbarController(
            settings,
            uiHotbar,
            socket,
            tokenHotbar,
            new ConsoleLogger(settings));

        spyOn(controller, 'load');

        // Act
        await controller.save(<User>{ isGM: false }, 'token-id', updates.hotbar);

        // Assert
        expect(tokenHotbar.setTokenMacros).not.toHaveBeenCalled();
    });

    it('does not call TokenHotbar.setTokenMacros if on not on the token hotbar page', async function() {
        const settings = new Settings();
        settings.lockHotbar = false;

        const page = 5;

        const uiMacros = { hotbar: { } };
        const uiHotbar = jasmine.createSpyObj(
            'UiHotbar', [ 'getTokenHotbarPage', 'onTokenHotbarPage', 'getMacrosByPage', 'offset' ]);
        uiHotbar.getTokenHotbarPage.and.returnValue(page);
        uiHotbar.getMacrosByPage.and.returnValue(uiMacros);
        uiHotbar.onTokenHotbarPage.and.returnValue(false);
        
        const tokenMacros = { hotbar: {} };
        const tokenHotbar = jasmine.createSpyObj('TokenHotbar', [ 'getMacrosByPage', 'setTokenMacros' ]);
        tokenHotbar.getMacrosByPage.and.returnValue(tokenMacros);

        const updates = { hotbar: { 41: 'some-macro' } };
        uiHotbar.offset.and.returnValue(updates);

        const controller = new TokenHotbarController(
            settings,
            uiHotbar,
            socket,
            tokenHotbar,
            new ConsoleLogger(settings));

        spyOn(controller, 'load');

        // Act
        await controller.save(<User>{ isGM: false }, 'token-id', updates);

        // Assert
        expect(tokenHotbar.setTokenMacros).not.toHaveBeenCalled();
    });
});

