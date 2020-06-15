/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! exports provided: CONSTANTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONSTANTS", function() { return CONSTANTS; });
const CONSTANTS = {
    moduleName: 'TokenHotbar',
};


/***/ }),

/***/ "./src/flags/factory.ts":
/*!******************************!*\
  !*** ./src/flags/factory.ts ***!
  \******************************/
/*! exports provided: HotbarFlagsFactory, FlagStrategyFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HotbarFlagsFactory", function() { return HotbarFlagsFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlagStrategyFactory", function() { return FlagStrategyFactory; });
/* harmony import */ var _hotbarFlags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hotbarFlags */ "./src/flags/hotbarFlags.ts");
/* harmony import */ var _flagStrategies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flagStrategies */ "./src/flags/flagStrategies.ts");


class HotbarFlagsFactory {
    constructor(settings) {
        this.settings = settings;
    }
    create() {
        const factory = new FlagStrategyFactory(this.settings, game, canvas);
        return new _hotbarFlags__WEBPACK_IMPORTED_MODULE_0__["FoundryHotbarFlags"](factory.createFlagStrategy());
    }
}
class FlagStrategyFactory {
    constructor(settings, game, canvas) {
        this.settings = settings;
        this.game = game;
        this.canvas = canvas;
    }
    createFlagStrategy() {
        if (this.settings.shareHotbar) {
            if (this.settings.alwaysLinkToActor) {
                return new _flagStrategies__WEBPACK_IMPORTED_MODULE_1__["AlwaysLinkedFlagsStrategy"](this.game.actors, this.canvas.tokens);
            }
            if (this.settings.linkToLinkedActor) {
                return new _flagStrategies__WEBPACK_IMPORTED_MODULE_1__["LinkedFlagsStrategy"](this.game.actors, this.canvas.tokens);
            }
            return new _flagStrategies__WEBPACK_IMPORTED_MODULE_1__["IdentityFlagsStrategy"](this.game.actors, this.canvas.tokens);
        }
        return new _flagStrategies__WEBPACK_IMPORTED_MODULE_1__["UserFlagsStrategy"](this.game.user, this.game.actors, this.canvas.tokens);
    }
    createFlagKeyStrategy() {
        if (this.settings.alwaysLinkToActor)
            return new _flagStrategies__WEBPACK_IMPORTED_MODULE_1__["AlwaysLinkedFlagsStrategy"](this.game.actors, this.canvas.tokens);
        if (this.settings.linkToLinkedActor)
            return new _flagStrategies__WEBPACK_IMPORTED_MODULE_1__["LinkedFlagsStrategy"](this.game.actors, this.canvas.tokens);
        return new _flagStrategies__WEBPACK_IMPORTED_MODULE_1__["IdentityFlagsStrategy"](this.game.actors, this.canvas.tokens);
    }
}


/***/ }),

/***/ "./src/flags/flagStrategies.ts":
/*!*************************************!*\
  !*** ./src/flags/flagStrategies.ts ***!
  \*************************************/
/*! exports provided: FlagsStrategy, UserFlagsStrategy, IdentityFlagsStrategy, LinkedFlagsStrategy, AlwaysLinkedFlagsStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlagsStrategy", function() { return FlagsStrategy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserFlagsStrategy", function() { return UserFlagsStrategy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdentityFlagsStrategy", function() { return IdentityFlagsStrategy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkedFlagsStrategy", function() { return LinkedFlagsStrategy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlwaysLinkedFlagsStrategy", function() { return AlwaysLinkedFlagsStrategy; });
class FlagsStrategy {
    constructor(actors, tokens) {
        this.actors = actors;
        this.tokens = tokens;
    }
    getEntity(entityId) {
        const entity = this.actors.get(entityId) || this.tokens.get(entityId);
        if (!entity) {
            throw new Error(`No actor or token exists with id '${entityId}'`);
        }
        return entity;
    }
    isToken(entity) {
        return 'actor' in entity;
    }
}
class UserFlagsStrategy extends FlagsStrategy {
    constructor(user, actors, tokens) {
        super(actors, tokens);
        this.user = user;
    }
    get(_entityId) {
        return this.user;
    }
}
class IdentityFlagsStrategy extends FlagsStrategy {
    constructor(actors, tokens) {
        super(actors, tokens);
    }
    get(entityId) {
        return this.getEntity(entityId);
    }
}
class LinkedFlagsStrategy extends FlagsStrategy {
    get(entityId) {
        const entity = this.getEntity(entityId);
        return this.isToken(entity) && entity.data.actorLink && entity.actor
            ? entity.actor
            : entity;
    }
}
class AlwaysLinkedFlagsStrategy extends FlagsStrategy {
    get(entityId) {
        const entity = this.getEntity(entityId);
        if (this.isToken(entity) && entity.actor)
            return entity.actor;
        return entity;
    }
}


/***/ }),

/***/ "./src/flags/hotbarFlags.ts":
/*!**********************************!*\
  !*** ./src/flags/hotbarFlags.ts ***!
  \**********************************/
/*! exports provided: FoundryHotbarFlags */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoundryHotbarFlags", function() { return FoundryHotbarFlags; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");

class FoundryHotbarFlags {
    constructor(getFlagStrategy) {
        this.getFlagStrategy = getFlagStrategy;
    }
    get(tokenId) {
        const flags = this.getFlagStrategy.get(tokenId);
        const result = flags.getFlag('world', _constants__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].moduleName) || {};
        return result;
    }
    set(tokenId, data) {
        return this.getFlagStrategy.get(tokenId)
            .unsetFlag('world', _constants__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].moduleName)
            .then(entity => {
            return entity.setFlag('world', _constants__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].moduleName, data);
        });
    }
}


/***/ }),

/***/ "./src/flags/pageFlag.ts":
/*!*******************************!*\
  !*** ./src/flags/pageFlag.ts ***!
  \*******************************/
/*! exports provided: PageFlag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageFlag", function() { return PageFlag; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");

class PageFlag {
    get() {
        const page = localStorage.getItem(`${_constants__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].moduleName}.activePage`);
        if (page)
            return +page;
        return 1;
    }
    set(page) {
        localStorage.setItem(`${_constants__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].moduleName}.activePage`, page + '');
    }
}


/***/ }),

/***/ "./src/hotbar/tokenHotbar.ts":
/*!***********************************!*\
  !*** ./src/hotbar/tokenHotbar.ts ***!
  \***********************************/
/*! exports provided: TokenHotbar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenHotbar", function() { return TokenHotbar; });
/* harmony import */ var _flags_flagStrategies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../flags/flagStrategies */ "./src/flags/flagStrategies.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class TokenHotbar {
    constructor(hotbarFlag, notifier, hotbarPage, flagKeyStrategy, logger = console) {
        this.hotbarFlag = hotbarFlag;
        this.notifier = notifier;
        this.hotbarPage = hotbarPage;
        this.flagKeyStrategy = flagKeyStrategy;
        this.logger = logger;
    }
    save(token, macrosToSave, canSave) {
        return __awaiter(this, void 0, void 0, function* () {
            const slots = this.getSlots();
            macrosToSave = macrosToSave.filter(m => m.macro && slots.includes(m.slot));
            const flagKey = this.flagKeyStrategy.get(token.id);
            const tokenHotbars = this.hotbarFlag.get(token.id);
            const tokenHotbar = tokenHotbars[flagKey.id] || [];
            if (!this.hasChanges(macrosToSave, tokenHotbar))
                return false;
            if (!canSave) {
                this.notifier.warn('The token hotbar is locked for players. Any macros placed on this page will be replaced.');
                return false;
            }
            this.logger.debug('[Token Hotbar]', 'preSave', flagKey, tokenHotbars);
            tokenHotbars[flagKey.id] =
                macrosToSave.map(item => {
                    return { slot: item.slot, id: item.macro.id };
                });
            this.logger.debug('[Token Hotbar]', 'Saving', flagKey, tokenHotbars);
            yield this.hotbarFlag.set(token.id, tokenHotbars);
            return true;
        });
    }
    load(token, userHotbar, gameMacros) {
        const tokenHotbars = this.hotbarFlag.get(token.id);
        const flagKey = this.flagKeyStrategy.get(token.id);
        const tokenHotbar = tokenHotbars[flagKey.id] || [];
        if (tokenHotbar.length === 0)
            return { hasMacros: false, hotbar: userHotbar };
        this.logger.debug('[Token Hotbar]', 'Loading', flagKey, tokenHotbar);
        let hasValidMacros = false;
        for (const slot of this.getSlots()) {
            const slotMacro = tokenHotbar.find(m => m.slot == slot);
            if (!slotMacro) {
                this.unset(userHotbar, slot);
            }
            else {
                const tokenMacro = gameMacros.find(m => m.id === slotMacro.id);
                if (tokenMacro) {
                    userHotbar[slot] = tokenMacro.id;
                    hasValidMacros = true;
                }
                else {
                    this.unset(userHotbar, slot);
                }
            }
        }
        return { hasMacros: hasValidMacros, hotbar: userHotbar };
    }
    remove(tokenId, actors, tokens) {
        const flagKey = new _flags_flagStrategies__WEBPACK_IMPORTED_MODULE_0__["IdentityFlagsStrategy"](actors, tokens).get(tokenId);
        const flags = this.hotbarFlag.get(tokenId);
        delete flags[flagKey.id];
        return this.hotbarFlag.set(tokenId, flags);
    }
    getSlots() {
        function range(size, startAt = 0) {
            return [...Array(size).keys()].map(i => i + startAt);
        }
        return range(10, (this.hotbarPage - 1) * 10 + 1);
    }
    unset(userHotbar, slot) {
        delete userHotbar[slot];
        userHotbar[`-=${slot}`] = null;
    }
    hasChanges(barMacros, tokenMacros) {
        this.logger.debug('[Token Hotbar]', 'Comparing', barMacros, tokenMacros);
        if (barMacros.length != tokenMacros.length)
            return true;
        for (let i = 0; i < barMacros.length; i++) {
            if (barMacros[i].slot != tokenMacros[i].slot)
                return true;
            if (barMacros[i].macro._id != tokenMacros[i].id)
                return true;
        }
        return false;
    }
}


/***/ }),

/***/ "./src/hotbar/userHotbar.ts":
/*!**********************************!*\
  !*** ./src/hotbar/userHotbar.ts ***!
  \**********************************/
/*! exports provided: UserHotbar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserHotbar", function() { return UserHotbar; });
class UserHotbar {
    constructor(settings, hotbar, pageFlag, logger = console) {
        this.settings = settings;
        this.hotbar = hotbar;
        this.pageFlag = pageFlag;
        this.logger = logger;
    }
    goToPage(hasTokenSelected) {
        if (hasTokenSelected) {
            return this.goToTokenHotbar();
        }
        else {
            return this.goToLastActivePage();
        }
    }
    goToTokenHotbar() {
        if (this.hotbar.page != this.settings.hotbarPage)
            this.pageFlag.set(this.hotbar.page);
        return this.render(this.settings.hotbarPage);
    }
    goToLastActivePage() {
        if (this.hotbar.page != this.settings.hotbarPage)
            return Promise.resolve();
        return this.render(this.pageFlag.get());
    }
    render(page) {
        this.hotbar.page = page;
        return new Promise((resolve) => {
            setTimeout(() => {
                this.hotbar.render();
                this.logger.debug('[Token Hotbar]', 'rendered page', page);
                resolve();
            }, 5);
        });
    }
}


/***/ }),

/***/ "./src/logger.ts":
/*!***********************!*\
  !*** ./src/logger.ts ***!
  \***********************/
/*! exports provided: ConsoleLogger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsoleLogger", function() { return ConsoleLogger; });
class ConsoleLogger {
    constructor(settings) {
        this.settings = settings;
    }
    error(...message) {
        console.error.apply(null, message);
    }
    warn(...message) {
        console.warn.apply(null, message);
    }
    info(...message) {
        console.info.apply(null, message);
    }
    debug(...message) {
        if (this.settings.debugMode)
            console.debug.apply(null, message);
    }
}


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./src/settings.ts");
/* harmony import */ var _hotbar_tokenHotbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hotbar/tokenHotbar */ "./src/hotbar/tokenHotbar.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _flags_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./flags/factory */ "./src/flags/factory.ts");
/* harmony import */ var _hotbar_userHotbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hotbar/userHotbar */ "./src/hotbar/userHotbar.ts");
/* harmony import */ var _flags_pageFlag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./flags/pageFlag */ "./src/flags/pageFlag.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./logger */ "./src/logger.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







function migrateFlag() {
    const oldData = game.user.getFlag('world', 'token-hotbar');
    const newData = game.user.getFlag('world', _constants__WEBPACK_IMPORTED_MODULE_2__["CONSTANTS"].moduleName);
    if (!oldData || newData) {
        console.debug('[Token Hotbar]', 'Nothing to migrate.', !!oldData, !!newData);
        return;
    }
    console.info('[Token Hotbar]', 'Migrating to new flag key.');
    game.user.setFlag('world', _constants__WEBPACK_IMPORTED_MODULE_2__["CONSTANTS"].moduleName, oldData);
    game.user.unsetFlag('world', 'token-hotbar');
}
function createTokenHotbar() {
    const settings = _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"]._load();
    const hotbarFlags = new _flags_factory__WEBPACK_IMPORTED_MODULE_3__["HotbarFlagsFactory"](settings);
    const keyStrategy = new _flags_factory__WEBPACK_IMPORTED_MODULE_3__["FlagStrategyFactory"](settings, game, canvas);
    return new _hotbar_tokenHotbar__WEBPACK_IMPORTED_MODULE_1__["TokenHotbar"](hotbarFlags.create(), ui.notifications, settings.hotbarPage, keyStrategy.createFlagKeyStrategy(), new _logger__WEBPACK_IMPORTED_MODULE_6__["ConsoleLogger"](settings));
}
Hooks.on('init', () => {
    game.settings.register(_constants__WEBPACK_IMPORTED_MODULE_2__["CONSTANTS"].moduleName, _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"].keys.hotbarPage, {
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
    game.settings.register(_constants__WEBPACK_IMPORTED_MODULE_2__["CONSTANTS"].moduleName, _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"].keys.linkToLinkedActor, {
        name: 'Link to linked actor',
        hint: 'Link the token hotbar to the actor if the token is linked.',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean
    });
    game.settings.register(_constants__WEBPACK_IMPORTED_MODULE_2__["CONSTANTS"].moduleName, _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"].keys.alwaysLinkToActor, {
        name: 'Always link to actor',
        hint: 'Link the token hotbar to the actor even if the token is unlinked.',
        scope: 'world',
        config: true,
        default: false,
        type: Boolean
    });
    game.settings.register(_constants__WEBPACK_IMPORTED_MODULE_2__["CONSTANTS"].moduleName, _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"].keys.shareHotbar, {
        name: 'Share the hotbar with other players',
        hint: 'When set every token will have a single hotbar shared by all players.',
        scope: 'world',
        config: true,
        default: false,
        type: Boolean
    });
    game.settings.register(_constants__WEBPACK_IMPORTED_MODULE_2__["CONSTANTS"].moduleName, _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"].keys.lockHotbar, {
        name: 'Lock shared hotbar',
        hint: 'When set, only a GM can update the token hotbar. Only applies to shared hotbars.',
        scope: 'world',
        config: true,
        default: false,
        type: Boolean
    });
    game.settings.register(_constants__WEBPACK_IMPORTED_MODULE_2__["CONSTANTS"].moduleName, _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"].keys.debugMode, {
        name: 'Debug Mode',
        hint: 'When set, Token Hotbar will log verbosely to the console.',
        scope: 'client',
        config: true,
        default: false,
        type: Boolean
    });
    console.log('[Token Hotbar]', 'Initialized Token Hotbar');
});
let renderHotbarTimeout;
Hooks.on('renderHotbar', (data) => {
    if (renderHotbarTimeout)
        clearTimeout(renderHotbarTimeout);
    renderHotbarTimeout = window.setTimeout(delayedSave, 20);
    function delayedSave() {
        const uiHotbar = ui.hotbar;
        const settings = _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"]._load();
        const macros = uiHotbar._getMacrosByPage(settings.hotbarPage);
        const token = canvas.tokens.controlled[0];
        if (token && settings.hotbarPage === uiHotbar.page)
            createTokenHotbar().save(token, macros, !settings.lockHotbar || game.user.isGM);
        return true;
    }
});
let controlTokenTimeout;
Hooks.on('controlToken', () => {
    if (controlTokenTimeout)
        clearTimeout(controlTokenTimeout);
    controlTokenTimeout = window.setTimeout(delayedLoad, 20);
    function delayedLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = canvas.tokens.controlled[0];
            const settings = _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"]._load();
            const logger = new _logger__WEBPACK_IMPORTED_MODULE_6__["ConsoleLogger"](settings);
            const uiHotbar = new _hotbar_userHotbar__WEBPACK_IMPORTED_MODULE_4__["UserHotbar"](settings, ui.hotbar, new _flags_pageFlag__WEBPACK_IMPORTED_MODULE_5__["PageFlag"](), logger);
            const userMacroData = game.user.data;
            if (token && canvas.tokens.controlled.length == 1) {
                logger.debug('[Token Hotbar]', 'controlled token', token);
                const result = createTokenHotbar()
                    .load(token, duplicate(userMacroData.hotbar), game.macros.entities);
                if (result.hasMacros) {
                    yield game.user.update({ hotbar: result.hotbar });
                    logger.debug('[Token Hotbar]', 'updated hotbar', token, result.hotbar);
                }
                uiHotbar.goToPage(result.hasMacros);
            }
            else {
                uiHotbar.goToPage(false);
                logger.debug('[Token Hotbar]', 'No or multiple controlled tokens');
            }
            return true;
        });
    }
});
Hooks.on('preDeleteToken', (_, token) => {
    createTokenHotbar().remove(token._id, game.actors, canvas.tokens);
    return true;
});
Hooks.on('preDeleteActor', (actor) => {
    createTokenHotbar().remove(actor.data._id, game.actors, canvas.tokens);
    return true;
});
Hooks.on('ready', () => {
    migrateFlag();
});


/***/ }),

/***/ "./src/settings.ts":
/*!*************************!*\
  !*** ./src/settings.ts ***!
  \*************************/
/*! exports provided: Settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Settings", function() { return Settings; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");

class Settings {
    load(s) {
        this.hotbarPage = this.getSetting(s, Settings.keys.hotbarPage);
        this.alwaysLinkToActor = this.getSetting(s, Settings.keys.alwaysLinkToActor);
        this.linkToLinkedActor = this.getSetting(s, Settings.keys.linkToLinkedActor) || this.alwaysLinkToActor;
        this.shareHotbar = this.getSetting(s, Settings.keys.shareHotbar);
        this.lockHotbar = this.getSetting(s, Settings.keys.lockHotbar) && this.shareHotbar;
        this.debugMode = this.getSetting(s, Settings.keys.debugMode);
        return this;
    }
    static _load() { return new Settings().load(game.settings); }
    getSetting(settings, key) {
        return settings.get(_constants__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].moduleName, key);
    }
}
Settings.keys = {
    alwaysLinkToActor: 'linkToActor',
    linkToLinkedActor: 'link',
    hotbarPage: 'page',
    shareHotbar: 'share',
    lockHotbar: 'lock',
    debugMode: 'debug'
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZmxhZ3MvZmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZmxhZ3MvZmxhZ1N0cmF0ZWdpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsYWdzL2hvdGJhckZsYWdzLnRzIiwid2VicGFjazovLy8uL3NyYy9mbGFncy9wYWdlRmxhZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaG90YmFyL3Rva2VuSG90YmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9ob3RiYXIvdXNlckhvdGJhci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNB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QUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFbkYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTdELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxLQUFlLE9BQU8sSUFBSSxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUvRCxVQUFVLENBQUMsUUFBOEIsRUFBRSxHQUFXO1FBQzFELE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxvREFBUyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuRCxDQUFDOztBQTNCTSxhQUFJLEdBQUc7SUFDVixpQkFBaUIsRUFBRSxhQUFhO0lBQ2hDLGlCQUFpQixFQUFFLE1BQU07SUFDekIsVUFBVSxFQUFFLE1BQU07SUFDbEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsVUFBVSxFQUFFLE1BQU07SUFDbEIsU0FBUyxFQUFFLE9BQU87Q0FDckIiLCJmaWxlIjoiVG9rZW5Ib3RiYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiZXhwb3J0IGNvbnN0IENPTlNUQU5UUyA9IHtcclxuICAgIG1vZHVsZU5hbWU6ICdUb2tlbkhvdGJhcicsXHJcbn07IiwiaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncyc7XHJcbmltcG9ydCB7IEZvdW5kcnlIb3RiYXJGbGFncywgSG90YmFyRmxhZ3MgfSBmcm9tICcuL2hvdGJhckZsYWdzJztcclxuaW1wb3J0IHsgSWRlbnRpdHlGbGFnc1N0cmF0ZWd5LCBVc2VyRmxhZ3NTdHJhdGVneSwgTGlua2VkRmxhZ3NTdHJhdGVneSwgQWx3YXlzTGlua2VkRmxhZ3NTdHJhdGVneSwgRmxhZ3NTdHJhdGVneSB9IGZyb20gJy4vZmxhZ1N0cmF0ZWdpZXMnO1xyXG5pbXBvcnQgeyBHYW1lLCBDYW52YXMgfSBmcm9tICcuLi9mb3VuZHJ5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBIb3RiYXJGbGFnc0ZhY3Rvcnkge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXR0aW5nczogU2V0dGluZ3MpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGUoKTogSG90YmFyRmxhZ3Mge1xyXG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSBuZXcgRmxhZ1N0cmF0ZWd5RmFjdG9yeSh0aGlzLnNldHRpbmdzLCBnYW1lLCBjYW52YXMpO1xyXG4gICAgICAgIHJldHVybiBuZXcgRm91bmRyeUhvdGJhckZsYWdzKGZhY3RvcnkuY3JlYXRlRmxhZ1N0cmF0ZWd5KCkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRmxhZ1N0cmF0ZWd5RmFjdG9yeSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXR0aW5nczogU2V0dGluZ3MsIHByaXZhdGUgZ2FtZTogR2FtZSwgcHJpdmF0ZSBjYW52YXM6IENhbnZhcykgeyB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZUZsYWdTdHJhdGVneSgpOiBGbGFnc1N0cmF0ZWd5ICB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hhcmVIb3RiYXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYWx3YXlzTGlua1RvQWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQWx3YXlzTGlua2VkRmxhZ3NTdHJhdGVneSh0aGlzLmdhbWUuYWN0b3JzLCB0aGlzLmNhbnZhcy50b2tlbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmxpbmtUb0xpbmtlZEFjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IExpbmtlZEZsYWdzU3RyYXRlZ3kodGhpcy5nYW1lLmFjdG9ycywgdGhpcy5jYW52YXMudG9rZW5zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IElkZW50aXR5RmxhZ3NTdHJhdGVneSh0aGlzLmdhbWUuYWN0b3JzLCB0aGlzLmNhbnZhcy50b2tlbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFVzZXJGbGFnc1N0cmF0ZWd5KHRoaXMuZ2FtZS51c2VyLCB0aGlzLmdhbWUuYWN0b3JzLCB0aGlzLmNhbnZhcy50b2tlbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVGbGFnS2V5U3RyYXRlZ3koKTogRmxhZ3NTdHJhdGVneSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYWx3YXlzTGlua1RvQWN0b3IpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQWx3YXlzTGlua2VkRmxhZ3NTdHJhdGVneSh0aGlzLmdhbWUuYWN0b3JzLCB0aGlzLmNhbnZhcy50b2tlbnMpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5saW5rVG9MaW5rZWRBY3RvcilcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBMaW5rZWRGbGFnc1N0cmF0ZWd5KHRoaXMuZ2FtZS5hY3RvcnMsIHRoaXMuY2FudmFzLnRva2Vucyk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgSWRlbnRpdHlGbGFnc1N0cmF0ZWd5KHRoaXMuZ2FtZS5hY3RvcnMsIHRoaXMuY2FudmFzLnRva2Vucyk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRmxhZ2dhYmxlLCBJQWN0b3IsIElUb2tlbiB9IGZyb20gJy4uL2ZvdW5kcnknO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZsYWdzU3RyYXRlZ3kge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhY3RvcnM6IE1hcDxzdHJpbmcsIElBY3Rvcj4sIHByb3RlY3RlZCB0b2tlbnM6IE1hcDxzdHJpbmcsIElUb2tlbj4pIHsgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gZW50aXR5SWQgVGhlIGlkIG9mIHRoZSBhY3RvciBvciB0b2tlblxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBnZXQoZW50aXR5SWQ6IHN0cmluZyk6IEZsYWdnYWJsZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0RW50aXR5KGVudGl0eUlkOiBzdHJpbmcpIDogSUFjdG9yIHwgSVRva2VuIHtcclxuICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLmFjdG9ycy5nZXQoZW50aXR5SWQpIHx8IHRoaXMudG9rZW5zLmdldChlbnRpdHlJZCk7IFxyXG4gICAgICAgIGlmICghZW50aXR5KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gYWN0b3Igb3IgdG9rZW4gZXhpc3RzIHdpdGggaWQgJyR7ZW50aXR5SWR9J2ApO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgcmV0dXJuIGVudGl0eTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaXNUb2tlbihlbnRpdHk6IElUb2tlbiB8IElBY3Rvcik6IGVudGl0eSBpcyBJVG9rZW4ge1xyXG4gICAgICAgIHJldHVybiAnYWN0b3InIGluIGVudGl0eTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJGbGFnc1N0cmF0ZWd5IGV4dGVuZHMgRmxhZ3NTdHJhdGVneSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVzZXI6IEZsYWdnYWJsZSwgYWN0b3JzOiBNYXA8c3RyaW5nLCBJQWN0b3I+LCB0b2tlbnM6IE1hcDxzdHJpbmcsIElUb2tlbj4pIHsgXHJcbiAgICAgICAgc3VwZXIoYWN0b3JzLCB0b2tlbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIGdldChfZW50aXR5SWQ6IHN0cmluZyk6IEZsYWdnYWJsZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIElkZW50aXR5RmxhZ3NTdHJhdGVneSBleHRlbmRzIEZsYWdzU3RyYXRlZ3kge1xyXG4gICAgY29uc3RydWN0b3IoYWN0b3JzOiBNYXA8c3RyaW5nLCBJQWN0b3I+LCB0b2tlbnM6IE1hcDxzdHJpbmcsIElUb2tlbj4pIHsgXHJcbiAgICAgICAgc3VwZXIoYWN0b3JzLCB0b2tlbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldChlbnRpdHlJZDogc3RyaW5nKTogRmxhZ2dhYmxlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRFbnRpdHkoZW50aXR5SWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGlua2VkRmxhZ3NTdHJhdGVneSBleHRlbmRzIEZsYWdzU3RyYXRlZ3kge1xyXG4gICAgZ2V0KGVudGl0eUlkOiBzdHJpbmcpOiBGbGFnZ2FibGUge1xyXG4gICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMuZ2V0RW50aXR5KGVudGl0eUlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1Rva2VuKGVudGl0eSkgJiYgZW50aXR5LmRhdGEuYWN0b3JMaW5rICYmIGVudGl0eS5hY3RvclxyXG4gICAgICAgICAgICA/IGVudGl0eS5hY3RvclxyXG4gICAgICAgICAgICA6IGVudGl0eTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFsd2F5c0xpbmtlZEZsYWdzU3RyYXRlZ3kgZXh0ZW5kcyBGbGFnc1N0cmF0ZWd5IHtcclxuICAgIGdldChlbnRpdHlJZDogc3RyaW5nKTogRmxhZ2dhYmxlIHtcclxuICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLmdldEVudGl0eShlbnRpdHlJZCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNUb2tlbihlbnRpdHkpICYmIGVudGl0eS5hY3RvcilcclxuICAgICAgICAgICAgcmV0dXJuIGVudGl0eS5hY3RvcjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVudGl0eTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IENPTlNUQU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IEZsYWdnYWJsZSB9IGZyb20gJy4uL2ZvdW5kcnknO1xyXG5pbXBvcnQgeyBGbGFnc1N0cmF0ZWd5IH0gZnJvbSAnLi9mbGFnU3RyYXRlZ2llcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEhvdGJhckl0ZW0ge1xyXG4gICAgaWQ6IHN0cmluZyxcclxuICAgIHNsb3Q6IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBIb3RiYXJEYXRhID0geyBbdG9rZW5JZDogc3RyaW5nXTogSG90YmFySXRlbVtdIH07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEhvdGJhckZsYWdzIHsgXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB0aGUgaG90YmFyIGZvciBhIHBhcnRpY3VsYXIgZW50aXR5LlxyXG4gICAgICogUE9TVDogUmV0dXJuIHZhbHVlIGlzIGFsd2F5cyBhbiBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0gZW50aXR5IHRoZSB0b2tlbiBvciBhY3RvciB0byBnZXQgdGhlIGhvdGJhciBmb3IuXHJcbiAgICAgKi9cclxuICAgIGdldCh0b2tlbklkOiBzdHJpbmcpOiBIb3RiYXJEYXRhO1xyXG5cclxuICAgIHNldCh0b2tlbklkOiBzdHJpbmcsIGRhdGE6IEhvdGJhckRhdGEpOiBQcm9taXNlPEZsYWdnYWJsZT47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGb3VuZHJ5SG90YmFyRmxhZ3MgaW1wbGVtZW50cyBIb3RiYXJGbGFncyB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdldEZsYWdTdHJhdGVneTogRmxhZ3NTdHJhdGVneSkgeyB9XHJcblxyXG4gICAgZ2V0KHRva2VuSWQ6IHN0cmluZyk6IEhvdGJhckRhdGEge1xyXG4gICAgICAgIGNvbnN0IGZsYWdzID0gdGhpcy5nZXRGbGFnU3RyYXRlZ3kuZ2V0KHRva2VuSWQpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGZsYWdzLmdldEZsYWcoJ3dvcmxkJywgQ09OU1RBTlRTLm1vZHVsZU5hbWUpIHx8IHt9O1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0KHRva2VuSWQ6IHN0cmluZywgZGF0YTogSG90YmFyRGF0YSk6IFByb21pc2U8RmxhZ2dhYmxlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmxhZ1N0cmF0ZWd5LmdldCh0b2tlbklkKVxyXG4gICAgICAgICAgICAudW5zZXRGbGFnKCd3b3JsZCcsIENPTlNUQU5UUy5tb2R1bGVOYW1lKVxyXG4gICAgICAgICAgICAudGhlbihlbnRpdHkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudGl0eS5zZXRGbGFnKCd3b3JsZCcsIENPTlNUQU5UUy5tb2R1bGVOYW1lLCBkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ09OU1RBTlRTIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQYWdlRmxhZyB7XHJcbiAgICBwdWJsaWMgZ2V0KCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgcGFnZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke0NPTlNUQU5UUy5tb2R1bGVOYW1lfS5hY3RpdmVQYWdlYCk7XHJcbiAgICAgICAgaWYgKHBhZ2UpIHJldHVybiArcGFnZTtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0KHBhZ2U6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke0NPTlNUQU5UUy5tb2R1bGVOYW1lfS5hY3RpdmVQYWdlYCwgcGFnZSArICcnKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEhvdGJhckZsYWdzLCB9IGZyb20gJy4uL2ZsYWdzL2hvdGJhckZsYWdzJztcclxuaW1wb3J0IHsgTm90aWZpZXIsIElkZW50aWZpYWJsZSwgTWFjcm8sIElUb2tlbiwgSUFjdG9yLCBGbGFnZ2FibGUgfSBmcm9tICcuLi9mb3VuZHJ5JztcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi4vbG9nZ2VyJztcclxuaW1wb3J0IHsgRmxhZ3NTdHJhdGVneSwgSWRlbnRpdHlGbGFnc1N0cmF0ZWd5IH0gZnJvbSAnLi4vZmxhZ3MvZmxhZ1N0cmF0ZWdpZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRva2VuSG90YmFyIHsgXHJcbiAgICAvLyBEZXYgbm90ZTogbm90IGZvbmQgb2YgdGhpcyBtYW55IHBhcmFtZXRlcnMuIFxyXG4gICAgLy8gSG93ZXZlciwgZnJvbSB2MyAoc2VwYXJhdGUgaG90YmFyKSBvbiBhdCBsZWFzdCB0d28gd2lsbCBiZSBvYnNvbGV0ZSAocGFnZXMpXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGhvdGJhckZsYWc6IEhvdGJhckZsYWdzLFxyXG4gICAgICAgIHByaXZhdGUgbm90aWZpZXI6IE5vdGlmaWVyLFxyXG4gICAgICAgIHByaXZhdGUgaG90YmFyUGFnZTogbnVtYmVyLFxyXG4gICAgICAgIHByaXZhdGUgZmxhZ0tleVN0cmF0ZWd5OiBGbGFnc1N0cmF0ZWd5LFxyXG4gICAgICAgIHByaXZhdGUgbG9nZ2VyOiBMb2dnZXIgPSBjb25zb2xlKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2F2ZSh0b2tlbjogSWRlbnRpZmlhYmxlLCBtYWNyb3NUb1NhdmU6IE1hY3JvW10sIGNhblNhdmU6IGJvb2xlYW4pOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuZ2V0U2xvdHMoKTtcclxuICAgICAgICBtYWNyb3NUb1NhdmUgPSBtYWNyb3NUb1NhdmUuZmlsdGVyKG0gPT4gbS5tYWNybyAmJiBzbG90cy5pbmNsdWRlcyhtLnNsb3QpKTtcclxuICAgICAgICBjb25zdCBmbGFnS2V5ID0gdGhpcy5mbGFnS2V5U3RyYXRlZ3kuZ2V0KHRva2VuLmlkKTtcclxuXHJcbiAgICAgICAgY29uc3QgdG9rZW5Ib3RiYXJzID0gdGhpcy5ob3RiYXJGbGFnLmdldCh0b2tlbi5pZCk7XHJcbiAgICAgICAgY29uc3QgdG9rZW5Ib3RiYXIgPSB0b2tlbkhvdGJhcnNbZmxhZ0tleS5pZF0gfHwgW107XHJcblxyXG4gICAgICAgIC8vIEZJWE1FOiB0aGlzIHNlZW1zIHZlcnkgaW5lZmZpY2llbnRcclxuICAgICAgICAvLyAgICAgICAgd2lsbCBiZWNvbWUgdW5uZWNlc3NhcnkgaW4gdjMuMC4wXHJcbiAgICAgICAgLy8gICAgICAgICEgV2lsbCBiZSB1bm5lY2Vzc2FyeSB0byBmaXggaW4gdjMuMC4wIChzZXBhcmF0ZSBob3RiYXIsIGFsbCBwYWdlcy9zbG90cyB3aWxsIGJlIHJlbGV2YW50KVxyXG4gICAgICAgIGlmICghdGhpcy5oYXNDaGFuZ2VzKG1hY3Jvc1RvU2F2ZSwgdG9rZW5Ib3RiYXIpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFjYW5TYXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZpZXIud2FybignVGhlIHRva2VuIGhvdGJhciBpcyBsb2NrZWQgZm9yIHBsYXllcnMuIEFueSBtYWNyb3MgcGxhY2VkIG9uIHRoaXMgcGFnZSB3aWxsIGJlIHJlcGxhY2VkLicpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnW1Rva2VuIEhvdGJhcl0nLCAncHJlU2F2ZScsIGZsYWdLZXksIHRva2VuSG90YmFycyk7XHJcblxyXG4gICAgICAgIHRva2VuSG90YmFyc1tmbGFnS2V5LmlkXSA9XHJcbiAgICAgICAgICAgIG1hY3Jvc1RvU2F2ZS5tYXAoaXRlbSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc2xvdDogaXRlbS5zbG90LCBpZDogaXRlbS5tYWNyby5pZCB9O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ1tUb2tlbiBIb3RiYXJdJywgJ1NhdmluZycsIGZsYWdLZXksIHRva2VuSG90YmFycyk7XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMuaG90YmFyRmxhZy5zZXQodG9rZW4uaWQsIHRva2VuSG90YmFycyk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFJldHVybnMgdHJ1ZSBpZiB0aGUgdG9rZW4gaGFzIG1hY3JvcyBvbiB0aGUgdG9rZW4gaG90YmFyXHJcbiAgICAvLyAgICAgICAgIG90aGVyd2lzZSBmYWxzZVxyXG4gICAgcHVibGljIGxvYWQodG9rZW46IElUb2tlbiwgdXNlckhvdGJhcjogeyBbc2xvdDogbnVtYmVyXTogc3RyaW5nIH0sIGdhbWVNYWNyb3M6IElkZW50aWZpYWJsZVtdKTogeyBoYXNNYWNyb3M6IGJvb2xlYW4sIGhvdGJhcjogdW5rbm93biB9IHtcclxuICAgICAgICBjb25zdCB0b2tlbkhvdGJhcnMgPSB0aGlzLmhvdGJhckZsYWcuZ2V0KHRva2VuLmlkKTtcclxuICAgICAgICBjb25zdCBmbGFnS2V5ID0gdGhpcy5mbGFnS2V5U3RyYXRlZ3kuZ2V0KHRva2VuLmlkKTtcclxuICAgICAgICBjb25zdCB0b2tlbkhvdGJhciA9IHRva2VuSG90YmFyc1tmbGFnS2V5LmlkXSB8fCBbXTtcclxuXHJcbiAgICAgICAgaWYgKHRva2VuSG90YmFyLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHsgaGFzTWFjcm9zOiBmYWxzZSwgaG90YmFyOiB1c2VySG90YmFyIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ1tUb2tlbiBIb3RiYXJdJywgJ0xvYWRpbmcnLCBmbGFnS2V5LCB0b2tlbkhvdGJhcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGhhc1ZhbGlkTWFjcm9zID0gZmFsc2U7XHJcbiAgICAgICAgZm9yKGNvbnN0IHNsb3Qgb2YgdGhpcy5nZXRTbG90cygpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsb3RNYWNybyA9IHRva2VuSG90YmFyLmZpbmQobSA9PiBtLnNsb3QgPT0gc2xvdCk7XHJcbiAgICAgICAgICAgIGlmICghc2xvdE1hY3JvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2V0KHVzZXJIb3RiYXIsIHNsb3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW5NYWNybyA9IGdhbWVNYWNyb3MuZmluZChtID0+IG0uaWQgPT09IHNsb3RNYWNyby5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodG9rZW5NYWNybykge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJIb3RiYXJbc2xvdF0gPSB0b2tlbk1hY3JvLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1ZhbGlkTWFjcm9zID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zZXQodXNlckhvdGJhciwgc2xvdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7IGhhc01hY3JvczogaGFzVmFsaWRNYWNyb3MsIGhvdGJhcjogdXNlckhvdGJhciB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUodG9rZW5JZDogc3RyaW5nLCBhY3RvcnM6IE1hcDxzdHJpbmcsIElBY3Rvcj4sIHRva2VuczogTWFwPHN0cmluZywgSVRva2VuPik6IFByb21pc2U8RmxhZ2dhYmxlPiB7XHJcbiAgICAgICAgLy8gdXNlIHRoZSBkZWZhdWx0IHN0cmF0ZWd5LCBiZWNhdXNlIG90aGVyd2lzZSBhIGxpbmtlZCBob3RiYXIgbWlnaHQgYmUgcmVtb3ZlZC5cclxuICAgICAgICAvLyBGSVhNRTogaWRlYWxseSB0aGlzIHNob3VsZCBub3QgYmUgaGFyZCBjb2RlZCBpbiBoZXJlXHJcbiAgICAgICAgY29uc3QgZmxhZ0tleSA9IG5ldyBJZGVudGl0eUZsYWdzU3RyYXRlZ3koYWN0b3JzLCB0b2tlbnMpLmdldCh0b2tlbklkKTtcclxuICAgICAgICBjb25zdCBmbGFncyA9IHRoaXMuaG90YmFyRmxhZy5nZXQodG9rZW5JZCk7XHJcbiAgICAgICAgZGVsZXRlIGZsYWdzW2ZsYWdLZXkuaWRdO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhvdGJhckZsYWcuc2V0KHRva2VuSWQsIGZsYWdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNsb3RzKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIHJhbmdlKHNpemU6IG51bWJlciwgc3RhcnRBdCA9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsuLi5BcnJheShzaXplKS5rZXlzKCldLm1hcChpID0+IGkgKyBzdGFydEF0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByYW5nZSgxMCwgKHRoaXMuaG90YmFyUGFnZSAtIDEpICogMTAgKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVuc2V0KHVzZXJIb3RiYXIsIHNsb3Q6IG51bWJlcikge1xyXG4gICAgICAgIGRlbGV0ZSB1c2VySG90YmFyW3Nsb3RdO1xyXG4gICAgICAgIHVzZXJIb3RiYXJbYC09JHtzbG90fWBdID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhc0NoYW5nZXMoYmFyTWFjcm9zLCB0b2tlbk1hY3Jvcykge1xyXG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdbVG9rZW4gSG90YmFyXScsICdDb21wYXJpbmcnLCBiYXJNYWNyb3MsIHRva2VuTWFjcm9zKTtcclxuICAgICAgICAvLyBjYW50IG1ha2UgY2hhbmdlcyBpZiB5b3UgYXJlIG5vdCBvbiB0aGUgcGFnZVxyXG4gICAgICAgIGlmIChiYXJNYWNyb3MubGVuZ3RoICE9IHRva2VuTWFjcm9zLmxlbmd0aCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBiYXJNYWNyb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGJhck1hY3Jvc1tpXS5zbG90ICE9IHRva2VuTWFjcm9zW2ldLnNsb3QpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoYmFyTWFjcm9zW2ldLm1hY3JvLl9pZCAhPSB0b2tlbk1hY3Jvc1tpXS5pZClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncyc7XHJcbmltcG9ydCB7IFBhZ2VGbGFnIH0gZnJvbSAnLi4vZmxhZ3MvcGFnZUZsYWcnO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuLi9sb2dnZXInO1xyXG5cclxuaW50ZXJmYWNlIEZvdW5kcnlIb3RiYXIge1xyXG4gICAgcGFnZTogbnVtYmVyO1xyXG4gICAgcmVuZGVyOiAoZm9yY2U/OiBib29sZWFuKSA9PiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVXNlckhvdGJhciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNldHRpbmdzOiBTZXR0aW5ncywgcHJpdmF0ZSBob3RiYXI6IEZvdW5kcnlIb3RiYXIsIHByaXZhdGUgcGFnZUZsYWc6IFBhZ2VGbGFnLCBwcml2YXRlIGxvZ2dlcjogTG9nZ2VyID0gY29uc29sZSkgeyB9XHJcblxyXG4gICAgcHVibGljIGdvVG9QYWdlKGhhc1Rva2VuU2VsZWN0ZWQ6IGJvb2xlYW4pOiBQcm9taXNlPHVua25vd24+IHtcclxuICAgICAgICBpZiAoaGFzVG9rZW5TZWxlY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nb1RvVG9rZW5Ib3RiYXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdvVG9MYXN0QWN0aXZlUGFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29Ub1Rva2VuSG90YmFyKCk6IFByb21pc2U8dW5rbm93bj4ge1xyXG4gICAgICAgIGlmICh0aGlzLmhvdGJhci5wYWdlICE9IHRoaXMuc2V0dGluZ3MuaG90YmFyUGFnZSlcclxuICAgICAgICAgICAgdGhpcy5wYWdlRmxhZy5zZXQodGhpcy5ob3RiYXIucGFnZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0aGlzLnNldHRpbmdzLmhvdGJhclBhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb1RvTGFzdEFjdGl2ZVBhZ2UoKTogUHJvbWlzZTx1bmtub3duPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaG90YmFyLnBhZ2UgIT0gdGhpcy5zZXR0aW5ncy5ob3RiYXJQYWdlKVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7IC8vIHVzZXIgYWxyZWFkeSBtb3ZlZCBhd2F5IGZyb20gdGhlIHRva2VuIGhvdGJhci5cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKHRoaXMucGFnZUZsYWcuZ2V0KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyKHBhZ2U6IG51bWJlcik6IFByb21pc2U8dW5rbm93bj4ge1xyXG4gICAgICAgIHRoaXMuaG90YmFyLnBhZ2UgPSBwYWdlO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgIC8vIEZJWE1FOiBSZW5kZXIgZG9lcyBub3QgYWx3YXlzIHdvcmsgd2l0aG91dCB0aGUgdGltZW91dC5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGJhci5yZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdbVG9rZW4gSG90YmFyXScsICdyZW5kZXJlZCBwYWdlJywgcGFnZSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0sIDUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSAnLi9zZXR0aW5ncyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExvZ2dlciB7XHJcbiAgICBlcnJvciguLi5tZXNzYWdlOiB1bmtub3duW10pOiB2b2lkO1xyXG4gICAgd2FybiguLi5tZXNzYWdlOiB1bmtub3duW10pOiB2b2lkO1xyXG4gICAgaW5mbyguLi5tZXNzYWdlOiB1bmtub3duW10pOiB2b2lkO1xyXG4gICAgZGVidWcoLi4ubWVzc2FnZTogdW5rbm93bltdKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnNvbGVMb2dnZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2V0dGluZ3M6IFNldHRpbmdzKSB7IH1cclxuXHJcbiAgICBlcnJvciguLi5tZXNzYWdlOiB1bmtub3duW10pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yLmFwcGx5KG51bGwsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHdhcm4oLi4ubWVzc2FnZTogdW5rbm93bltdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS53YXJuLmFwcGx5KG51bGwsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGluZm8oLi4ubWVzc2FnZTogdW5rbm93bltdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvLmFwcGx5KG51bGwsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlYnVnKC4uLm1lc3NhZ2U6IHVua25vd25bXSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmRlYnVnTW9kZSlcclxuICAgICAgICAgICAgY29uc29sZS5kZWJ1Zy5hcHBseShudWxsLCBtZXNzYWdlKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSAnLi9zZXR0aW5ncyc7XHJcbmltcG9ydCB7IFRva2VuSG90YmFyIH0gZnJvbSAnLi9ob3RiYXIvdG9rZW5Ib3RiYXInO1xyXG5pbXBvcnQgeyBDT05TVEFOVFMgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IEhvdGJhckZsYWdzRmFjdG9yeSwgRmxhZ1N0cmF0ZWd5RmFjdG9yeSB9IGZyb20gJy4vZmxhZ3MvZmFjdG9yeSc7XHJcbmltcG9ydCB7IFVzZXJIb3RiYXIgfSBmcm9tICcuL2hvdGJhci91c2VySG90YmFyJztcclxuaW1wb3J0IHsgUGFnZUZsYWcgfSBmcm9tICcuL2ZsYWdzL3BhZ2VGbGFnJztcclxuaW1wb3J0IHsgQ29uc29sZUxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbi8vIFRPRE86IFJlbW92ZSBpbiB2My4wLjBcclxuZnVuY3Rpb24gbWlncmF0ZUZsYWcoKSB7XHJcbiAgICBjb25zdCBvbGREYXRhID0gZ2FtZS51c2VyLmdldEZsYWcoJ3dvcmxkJywgJ3Rva2VuLWhvdGJhcicpO1xyXG4gICAgY29uc3QgbmV3RGF0YSA9IGdhbWUudXNlci5nZXRGbGFnKCd3b3JsZCcsIENPTlNUQU5UUy5tb2R1bGVOYW1lKTtcclxuICAgIGlmICghb2xkRGF0YSB8fCBuZXdEYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZygnW1Rva2VuIEhvdGJhcl0nLCAnTm90aGluZyB0byBtaWdyYXRlLicsICEhb2xkRGF0YSwgISFuZXdEYXRhKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5pbmZvKCdbVG9rZW4gSG90YmFyXScsICdNaWdyYXRpbmcgdG8gbmV3IGZsYWcga2V5LicpO1xyXG5cclxuICAgIGdhbWUudXNlci5zZXRGbGFnKCd3b3JsZCcsIENPTlNUQU5UUy5tb2R1bGVOYW1lLCBvbGREYXRhKTtcclxuICAgIGdhbWUudXNlci51bnNldEZsYWcoJ3dvcmxkJywgJ3Rva2VuLWhvdGJhcicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb2tlbkhvdGJhcigpIHtcclxuICAgIGNvbnN0IHNldHRpbmdzID0gU2V0dGluZ3MuX2xvYWQoKTtcclxuICAgIGNvbnN0IGhvdGJhckZsYWdzID0gbmV3IEhvdGJhckZsYWdzRmFjdG9yeShzZXR0aW5ncyk7XHJcbiAgICBjb25zdCBrZXlTdHJhdGVneSA9IG5ldyBGbGFnU3RyYXRlZ3lGYWN0b3J5KHNldHRpbmdzLCBnYW1lLCBjYW52YXMpO1xyXG4gICAgcmV0dXJuIG5ldyBUb2tlbkhvdGJhcihcclxuICAgICAgICBob3RiYXJGbGFncy5jcmVhdGUoKSxcclxuICAgICAgICB1aS5ub3RpZmljYXRpb25zLFxyXG4gICAgICAgIHNldHRpbmdzLmhvdGJhclBhZ2UsXHJcbiAgICAgICAga2V5U3RyYXRlZ3kuY3JlYXRlRmxhZ0tleVN0cmF0ZWd5KCksXHJcbiAgICAgICAgbmV3IENvbnNvbGVMb2dnZXIoc2V0dGluZ3MpKTtcclxufVxyXG5cclxuSG9va3Mub24oJ2luaXQnLCAoKSA9PiB7XHJcbiAgICBnYW1lLnNldHRpbmdzLnJlZ2lzdGVyKENPTlNUQU5UUy5tb2R1bGVOYW1lLCBTZXR0aW5ncy5rZXlzLmhvdGJhclBhZ2UsIHtcclxuICAgICAgICBuYW1lOiAnUGFnZScsXHJcbiAgICAgICAgaGludDogJ1RoZSBob3RiYXIgcGFnZSB0aGF0IHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgdG9rZW4gaG90YmFyLiBDaGFuZ2luZyB0aGlzIHdpbGwgd2lwZSBleGlzdGluZyB0b2tlbiBiYXJzIScsXHJcbiAgICAgICAgc2NvcGU6ICd3b3JsZCcsXHJcbiAgICAgICAgY29uZmlnOiB0cnVlLFxyXG4gICAgICAgIGRlZmF1bHQ6IDUsXHJcbiAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgIGNob2ljZXM6IHtcclxuICAgICAgICAgICAgMTogJ1BhZ2UgMScsXHJcbiAgICAgICAgICAgIDI6ICdQYWdlIDInLFxyXG4gICAgICAgICAgICAzOiAnUGFnZSAzJyxcclxuICAgICAgICAgICAgNDogJ1BhZ2UgNCcsXHJcbiAgICAgICAgICAgIDU6ICdQYWdlIDUnXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZ2FtZS5zZXR0aW5ncy5yZWdpc3RlcihDT05TVEFOVFMubW9kdWxlTmFtZSwgU2V0dGluZ3Mua2V5cy5saW5rVG9MaW5rZWRBY3Rvciwge1xyXG4gICAgICAgIG5hbWU6ICdMaW5rIHRvIGxpbmtlZCBhY3RvcicsXHJcbiAgICAgICAgaGludDogJ0xpbmsgdGhlIHRva2VuIGhvdGJhciB0byB0aGUgYWN0b3IgaWYgdGhlIHRva2VuIGlzIGxpbmtlZC4nLFxyXG4gICAgICAgIHNjb3BlOiAnd29ybGQnLFxyXG4gICAgICAgIGNvbmZpZzogdHJ1ZSxcclxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxyXG4gICAgICAgIHR5cGU6IEJvb2xlYW5cclxuICAgIH0pO1xyXG5cclxuICAgIGdhbWUuc2V0dGluZ3MucmVnaXN0ZXIoQ09OU1RBTlRTLm1vZHVsZU5hbWUsIFNldHRpbmdzLmtleXMuYWx3YXlzTGlua1RvQWN0b3IsIHtcclxuICAgICAgICBuYW1lOiAnQWx3YXlzIGxpbmsgdG8gYWN0b3InLFxyXG4gICAgICAgIGhpbnQ6ICdMaW5rIHRoZSB0b2tlbiBob3RiYXIgdG8gdGhlIGFjdG9yIGV2ZW4gaWYgdGhlIHRva2VuIGlzIHVubGlua2VkLicsXHJcbiAgICAgICAgc2NvcGU6ICd3b3JsZCcsXHJcbiAgICAgICAgY29uZmlnOiB0cnVlLFxyXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgIHR5cGU6IEJvb2xlYW5cclxuICAgIH0pO1xyXG5cclxuICAgIGdhbWUuc2V0dGluZ3MucmVnaXN0ZXIoQ09OU1RBTlRTLm1vZHVsZU5hbWUsIFNldHRpbmdzLmtleXMuc2hhcmVIb3RiYXIsIHtcclxuICAgICAgICBuYW1lOiAnU2hhcmUgdGhlIGhvdGJhciB3aXRoIG90aGVyIHBsYXllcnMnLFxyXG4gICAgICAgIGhpbnQ6ICdXaGVuIHNldCBldmVyeSB0b2tlbiB3aWxsIGhhdmUgYSBzaW5nbGUgaG90YmFyIHNoYXJlZCBieSBhbGwgcGxheWVycy4nLFxyXG4gICAgICAgIHNjb3BlOiAnd29ybGQnLFxyXG4gICAgICAgIGNvbmZpZzogdHJ1ZSxcclxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICB0eXBlOiBCb29sZWFuXHJcbiAgICB9KTtcclxuXHJcbiAgICBnYW1lLnNldHRpbmdzLnJlZ2lzdGVyKENPTlNUQU5UUy5tb2R1bGVOYW1lLCBTZXR0aW5ncy5rZXlzLmxvY2tIb3RiYXIsIHtcclxuICAgICAgICBuYW1lOiAnTG9jayBzaGFyZWQgaG90YmFyJyxcclxuICAgICAgICBoaW50OiAnV2hlbiBzZXQsIG9ubHkgYSBHTSBjYW4gdXBkYXRlIHRoZSB0b2tlbiBob3RiYXIuIE9ubHkgYXBwbGllcyB0byBzaGFyZWQgaG90YmFycy4nLFxyXG4gICAgICAgIHNjb3BlOiAnd29ybGQnLFxyXG4gICAgICAgIGNvbmZpZzogdHJ1ZSxcclxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICB0eXBlOiBCb29sZWFuXHJcbiAgICB9KTtcclxuXHJcbiAgICBnYW1lLnNldHRpbmdzLnJlZ2lzdGVyKENPTlNUQU5UUy5tb2R1bGVOYW1lLCBTZXR0aW5ncy5rZXlzLmRlYnVnTW9kZSwge1xyXG4gICAgICAgIG5hbWU6ICdEZWJ1ZyBNb2RlJyxcclxuICAgICAgICBoaW50OiAnV2hlbiBzZXQsIFRva2VuIEhvdGJhciB3aWxsIGxvZyB2ZXJib3NlbHkgdG8gdGhlIGNvbnNvbGUuJyxcclxuICAgICAgICBzY29wZTogJ2NsaWVudCcsXHJcbiAgICAgICAgY29uZmlnOiB0cnVlLFxyXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgIHR5cGU6IEJvb2xlYW5cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCdbVG9rZW4gSG90YmFyXScsICdJbml0aWFsaXplZCBUb2tlbiBIb3RiYXInKTtcclxufSk7XHJcblxyXG5sZXQgcmVuZGVySG90YmFyVGltZW91dDogbnVtYmVyO1xyXG5Ib29rcy5vbigncmVuZGVySG90YmFyJywgKGRhdGE6IGFueSkgPT4ge1xyXG5cclxuICAgIGlmIChyZW5kZXJIb3RiYXJUaW1lb3V0KVxyXG4gICAgICAgIGNsZWFyVGltZW91dChyZW5kZXJIb3RiYXJUaW1lb3V0KTtcclxuXHJcbiAgICByZW5kZXJIb3RiYXJUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoZGVsYXllZFNhdmUsIDIwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBkZWxheWVkU2F2ZSgpIHtcclxuICAgICAgICAvLyBjb25zdCBtYWNyb3MgPSBkYXRhLm1hY3JvcztcclxuICAgICAgICAvLyBGSVhNRTogZHVlIHRvIGEgcmFjZSBjb25kaXRpb24sIHNvbWV0aW1lcyB0aGUgd3JvbmcgbWFjcm9zIGFyZSBwYXNzZWQuXHJcbiAgICAgICAgLy8gICAgICAgIFdlIGFyZSBvbmx5IGludGVyZXN0ZWQgaW4gdGhlIG9uZXMgb24gdGhlIHRva2VuIGhvdGJhci5cclxuICAgICAgICAvLyAgICAgICAgISBXaWxsIGJlIHVubmVjZXNzYXJ5IHRvIGZpeCBpbiB2My4wLjAgKHNlcGFyYXRlIGhvdGJhciwgYWxsIHBhZ2VzL3Nsb3RzIHdpbGwgYmUgcmVsZXZhbnQpXHJcbiAgICAgICAgY29uc3QgdWlIb3RiYXIgPSAoPGFueT51aSkuaG90YmFyO1xyXG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gU2V0dGluZ3MuX2xvYWQoKTtcclxuICAgICAgICBjb25zdCBtYWNyb3MgPSB1aUhvdGJhci5fZ2V0TWFjcm9zQnlQYWdlKHNldHRpbmdzLmhvdGJhclBhZ2UpO1xyXG5cclxuICAgICAgICBjb25zdCB0b2tlbiA9IGNhbnZhcy50b2tlbnMuY29udHJvbGxlZFswXTtcclxuICAgICAgICBpZiAodG9rZW4gJiYgc2V0dGluZ3MuaG90YmFyUGFnZSA9PT0gdWlIb3RiYXIucGFnZSlcclxuICAgICAgICAgICAgY3JlYXRlVG9rZW5Ib3RiYXIoKS5zYXZlKHRva2VuLCBtYWNyb3MsICFzZXR0aW5ncy5sb2NrSG90YmFyIHx8IGdhbWUudXNlci5pc0dNKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5sZXQgY29udHJvbFRva2VuVGltZW91dDogbnVtYmVyO1xyXG5Ib29rcy5vbignY29udHJvbFRva2VuJywgKCkgPT4ge1xyXG4gICAgaWYgKGNvbnRyb2xUb2tlblRpbWVvdXQpXHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGNvbnRyb2xUb2tlblRpbWVvdXQpO1xyXG5cclxuICAgIGNvbnRyb2xUb2tlblRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChkZWxheWVkTG9hZCwgMjApO1xyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGRlbGF5ZWRMb2FkKCkge1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gY2FudmFzLnRva2Vucy5jb250cm9sbGVkWzBdO1xyXG5cclxuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IFNldHRpbmdzLl9sb2FkKCk7XHJcbiAgICAgICAgY29uc3QgbG9nZ2VyID0gbmV3IENvbnNvbGVMb2dnZXIoc2V0dGluZ3MpO1xyXG4gICAgICAgIGNvbnN0IHVpSG90YmFyID0gbmV3IFVzZXJIb3RiYXIoc2V0dGluZ3MsICg8YW55PnVpKS5ob3RiYXIsIG5ldyBQYWdlRmxhZygpLCBsb2dnZXIpO1xyXG5cclxuICAgICAgICBjb25zdCB1c2VyTWFjcm9EYXRhID0gPGFueT5nYW1lLnVzZXIuZGF0YTtcclxuXHJcbiAgICAgICAgaWYgKHRva2VuICYmIGNhbnZhcy50b2tlbnMuY29udHJvbGxlZC5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAvLyBob3RiYXIgZG9lcyBub3QgeWV0IGV4aXN0IG9uIGdhbWUudXNlci5kYXRhIGFuZCB1aSBkZWZpbml0aW9ucywgaGVuY2UgdGhlIGNhc3RzIHRvIGFueS5cclxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdbVG9rZW4gSG90YmFyXScsICdjb250cm9sbGVkIHRva2VuJywgdG9rZW4pO1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjcmVhdGVUb2tlbkhvdGJhcigpXHJcbiAgICAgICAgICAgICAgICAubG9hZCh0b2tlbiwgZHVwbGljYXRlKHVzZXJNYWNyb0RhdGEuaG90YmFyKSwgZ2FtZS5tYWNyb3MuZW50aXRpZXMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5oYXNNYWNyb3MpIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IGdhbWUudXNlci51cGRhdGUoeyBob3RiYXI6IHJlc3VsdC5ob3RiYXIgfSk7XHJcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoJ1tUb2tlbiBIb3RiYXJdJywgJ3VwZGF0ZWQgaG90YmFyJywgdG9rZW4sIHJlc3VsdC5ob3RiYXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHVpSG90YmFyLmdvVG9QYWdlKHJlc3VsdC5oYXNNYWNyb3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdWlIb3RiYXIuZ29Ub1BhZ2UoZmFsc2UpO1xyXG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ1tUb2tlbiBIb3RiYXJdJywgJ05vIG9yIG11bHRpcGxlIGNvbnRyb2xsZWQgdG9rZW5zJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbkhvb2tzLm9uKCdwcmVEZWxldGVUb2tlbicsIChfOiBTY2VuZSwgdG9rZW46IGFueSkgPT4ge1xyXG4gICAgY3JlYXRlVG9rZW5Ib3RiYXIoKS5yZW1vdmUodG9rZW4uX2lkLCBnYW1lLmFjdG9ycywgY2FudmFzLnRva2Vucyk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufSk7XHJcblxyXG5Ib29rcy5vbigncHJlRGVsZXRlQWN0b3InLCAoYWN0b3I6IGFueSkgPT4ge1xyXG4gICAgY3JlYXRlVG9rZW5Ib3RiYXIoKS5yZW1vdmUoYWN0b3IuZGF0YS5faWQsIGdhbWUuYWN0b3JzLCBjYW52YXMudG9rZW5zKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59KTtcclxuXHJcbkhvb2tzLm9uKCdyZWFkeScsICgpID0+IHtcclxuICAgIG1pZ3JhdGVGbGFnKCk7XHJcbn0pOyIsImltcG9ydCB7IENPTlNUQU5UUyB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2xpZW50U2V0dGluZ3NSZWFkZXIge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIGdldChzY29wZTogc3RyaW5nLCBrZXk6IHN0cmluZyk6IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzIHtcclxuICAgIGFsd2F5c0xpbmtUb0FjdG9yOiBib29sZWFuO1xyXG4gICAgbGlua1RvTGlua2VkQWN0b3I6IGJvb2xlYW47XHJcbiAgICBob3RiYXJQYWdlOiBudW1iZXI7XHJcbiAgICBzaGFyZUhvdGJhcjogYm9vbGVhbjtcclxuICAgIGxvY2tIb3RiYXI6IGJvb2xlYW47XHJcbiAgICBkZWJ1Z01vZGU6IGJvb2xlYW47XHJcblxyXG4gICAgc3RhdGljIGtleXMgPSB7XHJcbiAgICAgICAgYWx3YXlzTGlua1RvQWN0b3I6ICdsaW5rVG9BY3RvcicsXHJcbiAgICAgICAgbGlua1RvTGlua2VkQWN0b3I6ICdsaW5rJyxcclxuICAgICAgICBob3RiYXJQYWdlOiAncGFnZScsXHJcbiAgICAgICAgc2hhcmVIb3RiYXI6ICdzaGFyZScsXHJcbiAgICAgICAgbG9ja0hvdGJhcjogJ2xvY2snLFxyXG4gICAgICAgIGRlYnVnTW9kZTogJ2RlYnVnJ1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkKHM6IENsaWVudFNldHRpbmdzUmVhZGVyKSA6IFNldHRpbmdzIHtcclxuICAgICAgICB0aGlzLmhvdGJhclBhZ2UgPSB0aGlzLmdldFNldHRpbmcocywgU2V0dGluZ3Mua2V5cy5ob3RiYXJQYWdlKTtcclxuXHJcbiAgICAgICAgdGhpcy5hbHdheXNMaW5rVG9BY3RvciA9IHRoaXMuZ2V0U2V0dGluZyhzLCBTZXR0aW5ncy5rZXlzLmFsd2F5c0xpbmtUb0FjdG9yKTtcclxuICAgICAgICB0aGlzLmxpbmtUb0xpbmtlZEFjdG9yID0gdGhpcy5nZXRTZXR0aW5nKHMsIFNldHRpbmdzLmtleXMubGlua1RvTGlua2VkQWN0b3IpIHx8IHRoaXMuYWx3YXlzTGlua1RvQWN0b3I7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcmVIb3RiYXIgPSB0aGlzLmdldFNldHRpbmcocywgU2V0dGluZ3Mua2V5cy5zaGFyZUhvdGJhcik7XHJcbiAgICAgICAgdGhpcy5sb2NrSG90YmFyID0gdGhpcy5nZXRTZXR0aW5nKHMsIFNldHRpbmdzLmtleXMubG9ja0hvdGJhcikgJiYgdGhpcy5zaGFyZUhvdGJhcjtcclxuXHJcbiAgICAgICAgdGhpcy5kZWJ1Z01vZGUgPSB0aGlzLmdldFNldHRpbmcocywgU2V0dGluZ3Mua2V5cy5kZWJ1Z01vZGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgX2xvYWQoKTogU2V0dGluZ3MgeyByZXR1cm4gbmV3IFNldHRpbmdzKCkubG9hZChnYW1lLnNldHRpbmdzKTsgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U2V0dGluZyhzZXR0aW5nczogQ2xpZW50U2V0dGluZ3NSZWFkZXIsIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzLmdldChDT05TVEFOVFMubW9kdWxlTmFtZSwga2V5KTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=