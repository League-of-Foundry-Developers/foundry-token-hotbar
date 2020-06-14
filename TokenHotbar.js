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
    constructor(showDebug = false) {
        this.showDebug = showDebug;
    }
    static init() {
        window['TokenHotbar'] = { debug: false };
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
        if (this.showDebug)
            console.debug.apply(null, ...message);
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
    let oldData = game.user.getFlag("world", "token-hotbar");
    let newData = game.user.getFlag("world", _constants__WEBPACK_IMPORTED_MODULE_2__["CONSTANTS"].moduleName);
    if (!oldData || newData) {
        console.debug("[Token Hotbar]", "Nothing to migrate.", !!oldData, !!newData);
        return;
    }
    console.info("[Token Hotbar]", "Migrating to new flag key.");
    game.user.setFlag("world", _constants__WEBPACK_IMPORTED_MODULE_2__["CONSTANTS"].moduleName, oldData);
    game.user.unsetFlag("world", "token-hotbar");
}
function createTokenHotbar() {
    const settings = new _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"]().load(game.settings);
    const hotbarFlags = new _flags_factory__WEBPACK_IMPORTED_MODULE_3__["HotbarFlagsFactory"](settings);
    const keyStrategy = new _flags_factory__WEBPACK_IMPORTED_MODULE_3__["FlagStrategyFactory"](settings, game, canvas);
    return new _hotbar_tokenHotbar__WEBPACK_IMPORTED_MODULE_1__["TokenHotbar"](hotbarFlags.create(), ui.notifications, settings.hotbarPage, keyStrategy.createFlagKeyStrategy(), new _logger__WEBPACK_IMPORTED_MODULE_6__["ConsoleLogger"](window.TokenHotbar.debug));
}
Hooks.on("init", () => {
    _logger__WEBPACK_IMPORTED_MODULE_6__["ConsoleLogger"].init();
    game.settings.register(_constants__WEBPACK_IMPORTED_MODULE_2__["CONSTANTS"].moduleName, _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"].keys.hotbarPage, {
        name: "Page",
        hint: "The hotbar page that will be replaced with the token hotbar. Changing this will wipe existing token bars!",
        scope: "world",
        config: true,
        default: 5,
        type: Number
    });
    game.settings.register(_constants__WEBPACK_IMPORTED_MODULE_2__["CONSTANTS"].moduleName, _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"].keys.linkToLinkedActor, {
        name: "Link to linked actor",
        hint: "Link the token hotbar to the actor if the token is linked.",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });
    game.settings.register(_constants__WEBPACK_IMPORTED_MODULE_2__["CONSTANTS"].moduleName, _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"].keys.alwaysLinkToActor, {
        name: "Always link to actor",
        hint: "Link the token hotbar to the actor even if the token is unlinked.",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
    game.settings.register(_constants__WEBPACK_IMPORTED_MODULE_2__["CONSTANTS"].moduleName, _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"].keys.shareHotbar, {
        name: "Share the hotbar with other players",
        hint: "When set every token will have a single hotbar shared by all players.",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
    game.settings.register(_constants__WEBPACK_IMPORTED_MODULE_2__["CONSTANTS"].moduleName, _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"].keys.lockHotbar, {
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
Hooks.on("renderHotbar", (data) => {
    const settings = new _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"]().load(game.settings);
    const macros = ui.hotbar._getMacrosByPage(settings.hotbarPage);
    const token = canvas.tokens.controlled[0];
    if (token && settings.hotbarPage === ui.hotbar.page)
        createTokenHotbar().save(token, macros, !settings.lockHotbar || game.user.isGM);
    return true;
});
Hooks.on("controlToken", () => __awaiter(void 0, void 0, void 0, function* () {
    const token = canvas.tokens.controlled[0];
    const logger = new _logger__WEBPACK_IMPORTED_MODULE_6__["ConsoleLogger"]();
    const uiHotbar = new _hotbar_userHotbar__WEBPACK_IMPORTED_MODULE_4__["UserHotbar"](new _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"]().load(game.settings), ui.hotbar, new _flags_pageFlag__WEBPACK_IMPORTED_MODULE_5__["PageFlag"](), logger);
    if (token && canvas.tokens.controlled.length == 1) {
        logger.debug("[Token Hotbar]", "controlled token", token);
        let result = createTokenHotbar()
            .load(token, duplicate(game.user.data.hotbar), game.macros.entities);
        if (result.hasMacros) {
            yield game.user.update({ hotbar: result.hotbar });
            logger.debug("[Token Hotbar]", "updated hotbar", token, result.hotbar);
        }
        uiHotbar.goToPage(result.hasMacros);
    }
    else {
        uiHotbar.goToPage(false);
        logger.debug("[Token Hotbar]", "No or multiple controlled tokens");
    }
    return true;
}));
Hooks.on("preDeleteToken", (_, token) => {
    createTokenHotbar().remove(token._id, game.actors, canvas.tokens);
    return true;
});
Hooks.on("preDeleteActor", (actor) => {
    createTokenHotbar().remove(actor.data._id, game.actors, canvas.tokens);
    return true;
});
Hooks.on("ready", () => {
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
        return this;
    }
    getSetting(settings, key) {
        return settings.get(_constants__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].moduleName, key);
    }
}
Settings.keys = {
    alwaysLinkToActor: 'linkToActor',
    linkToLinkedActor: 'link',
    hotbarPage: 'page',
    shareHotbar: 'share',
    lockHotbar: 'lock'
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZmxhZ3MvZmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZmxhZ3MvZmxhZ1N0cmF0ZWdpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsYWdzL2hvdGJhckZsYWdzLnRzIiwid2VicGFjazovLy8uL3NyYy9mbGFncy9wYWdlRmxhZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaG90YmFyL3Rva2VuSG90YmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9ob3RiYXIvdXNlckhvdGJhci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNB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ZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsImV4cG9ydCBjb25zdCBDT05TVEFOVFMgPSB7XHJcbiAgICBtb2R1bGVOYW1lOiAnVG9rZW5Ib3RiYXInLFxyXG59OyIsImltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3MnO1xyXG5pbXBvcnQgeyBGb3VuZHJ5SG90YmFyRmxhZ3MsIEhvdGJhckZsYWdzIH0gZnJvbSAnLi9ob3RiYXJGbGFncyc7XHJcbmltcG9ydCB7IElkZW50aXR5RmxhZ3NTdHJhdGVneSwgVXNlckZsYWdzU3RyYXRlZ3ksIExpbmtlZEZsYWdzU3RyYXRlZ3ksIEFsd2F5c0xpbmtlZEZsYWdzU3RyYXRlZ3ksIEZsYWdzU3RyYXRlZ3kgfSBmcm9tICcuL2ZsYWdTdHJhdGVnaWVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBIb3RiYXJGbGFnc0ZhY3Rvcnkge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXR0aW5nczogU2V0dGluZ3MpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGUoKTogSG90YmFyRmxhZ3Mge1xyXG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSBuZXcgRmxhZ1N0cmF0ZWd5RmFjdG9yeSh0aGlzLnNldHRpbmdzLCBnYW1lLCBjYW52YXMpO1xyXG4gICAgICAgIHJldHVybiBuZXcgRm91bmRyeUhvdGJhckZsYWdzKGZhY3RvcnkuY3JlYXRlRmxhZ1N0cmF0ZWd5KCkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRmxhZ1N0cmF0ZWd5RmFjdG9yeSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXR0aW5nczogU2V0dGluZ3MsIHByaXZhdGUgZ2FtZTogYW55LCBwcml2YXRlIGNhbnZhczogYW55KSB7IH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlRmxhZ1N0cmF0ZWd5KCk6IEZsYWdzU3RyYXRlZ3kgIHtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaGFyZUhvdGJhcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hbHdheXNMaW5rVG9BY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBbHdheXNMaW5rZWRGbGFnc1N0cmF0ZWd5KHRoaXMuZ2FtZS5hY3RvcnMsIHRoaXMuY2FudmFzLnRva2Vucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubGlua1RvTGlua2VkQWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTGlua2VkRmxhZ3NTdHJhdGVneSh0aGlzLmdhbWUuYWN0b3JzLCB0aGlzLmNhbnZhcy50b2tlbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSWRlbnRpdHlGbGFnc1N0cmF0ZWd5KHRoaXMuZ2FtZS5hY3RvcnMsIHRoaXMuY2FudmFzLnRva2Vucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgVXNlckZsYWdzU3RyYXRlZ3kodGhpcy5nYW1lLnVzZXIsIHRoaXMuZ2FtZS5hY3RvcnMsIHRoaXMuY2FudmFzLnRva2Vucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZUZsYWdLZXlTdHJhdGVneSgpOiBGbGFnc1N0cmF0ZWd5IHtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hbHdheXNMaW5rVG9BY3RvcilcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBbHdheXNMaW5rZWRGbGFnc1N0cmF0ZWd5KHRoaXMuZ2FtZS5hY3RvcnMsIHRoaXMuY2FudmFzLnRva2Vucyk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmxpbmtUb0xpbmtlZEFjdG9yKVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IExpbmtlZEZsYWdzU3RyYXRlZ3kodGhpcy5nYW1lLmFjdG9ycywgdGhpcy5jYW52YXMudG9rZW5zKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBJZGVudGl0eUZsYWdzU3RyYXRlZ3kodGhpcy5nYW1lLmFjdG9ycywgdGhpcy5jYW52YXMudG9rZW5zKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBGbGFnZ2FibGUsIElBY3RvciwgSVRva2VuIH0gZnJvbSAnLi4vZm91bmRyeSc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRmxhZ3NTdHJhdGVneSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFjdG9yczogTWFwPHN0cmluZywgSUFjdG9yPiwgcHJvdGVjdGVkIHRva2VuczogTWFwPHN0cmluZywgSVRva2VuPikgeyB9XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBlbnRpdHlJZCBUaGUgaWQgb2YgdGhlIGFjdG9yIG9yIHRva2VuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGdldChlbnRpdHlJZDogc3RyaW5nKTogRmxhZ2dhYmxlO1xyXG5cclxuICAgIHByb3RlY3RlZCBnZXRFbnRpdHkoZW50aXR5SWQ6IHN0cmluZykgOiBJQWN0b3IgfCBJVG9rZW4ge1xyXG4gICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMuYWN0b3JzLmdldChlbnRpdHlJZCkgfHwgdGhpcy50b2tlbnMuZ2V0KGVudGl0eUlkKTsgXHJcbiAgICAgICAgaWYgKCFlbnRpdHkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBhY3RvciBvciB0b2tlbiBleGlzdHMgd2l0aCBpZCAnJHtlbnRpdHlJZH0nYCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICByZXR1cm4gZW50aXR5O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpc1Rva2VuKGVudGl0eTogSVRva2VuIHwgSUFjdG9yKTogZW50aXR5IGlzIElUb2tlbiB7XHJcbiAgICAgICAgcmV0dXJuICdhY3RvcicgaW4gZW50aXR5O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVXNlckZsYWdzU3RyYXRlZ3kgZXh0ZW5kcyBGbGFnc1N0cmF0ZWd5IHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdXNlcjogRmxhZ2dhYmxlLCBhY3RvcnM6IE1hcDxzdHJpbmcsIElBY3Rvcj4sIHRva2VuczogTWFwPHN0cmluZywgSVRva2VuPikgeyBcclxuICAgICAgICBzdXBlcihhY3RvcnMsIHRva2Vucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgZ2V0KF9lbnRpdHlJZDogc3RyaW5nKTogRmxhZ2dhYmxlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51c2VyO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSWRlbnRpdHlGbGFnc1N0cmF0ZWd5IGV4dGVuZHMgRmxhZ3NTdHJhdGVneSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhY3RvcnM6IE1hcDxzdHJpbmcsIElBY3Rvcj4sIHRva2VuczogTWFwPHN0cmluZywgSVRva2VuPikgeyBcclxuICAgICAgICBzdXBlcihhY3RvcnMsIHRva2Vucyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KGVudGl0eUlkOiBzdHJpbmcpOiBGbGFnZ2FibGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEVudGl0eShlbnRpdHlJZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5rZWRGbGFnc1N0cmF0ZWd5IGV4dGVuZHMgRmxhZ3NTdHJhdGVneSB7XHJcbiAgICBnZXQoZW50aXR5SWQ6IHN0cmluZyk6IEZsYWdnYWJsZSB7XHJcbiAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5nZXRFbnRpdHkoZW50aXR5SWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVG9rZW4oZW50aXR5KSAmJiBlbnRpdHkuZGF0YS5hY3RvckxpbmsgJiYgZW50aXR5LmFjdG9yXHJcbiAgICAgICAgICAgID8gZW50aXR5LmFjdG9yXHJcbiAgICAgICAgICAgIDogZW50aXR5O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWx3YXlzTGlua2VkRmxhZ3NTdHJhdGVneSBleHRlbmRzIEZsYWdzU3RyYXRlZ3kge1xyXG4gICAgZ2V0KGVudGl0eUlkOiBzdHJpbmcpOiBGbGFnZ2FibGUge1xyXG4gICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMuZ2V0RW50aXR5KGVudGl0eUlkKTtcclxuICAgICAgICBpZiAodGhpcy5pc1Rva2VuKGVudGl0eSkgJiYgZW50aXR5LmFjdG9yKVxyXG4gICAgICAgICAgICByZXR1cm4gZW50aXR5LmFjdG9yO1xyXG5cclxuICAgICAgICByZXR1cm4gZW50aXR5O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQ09OU1RBTlRTIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgRmxhZ2dhYmxlIH0gZnJvbSAnLi4vZm91bmRyeSc7XHJcbmltcG9ydCB7IEZsYWdzU3RyYXRlZ3kgfSBmcm9tICcuL2ZsYWdTdHJhdGVnaWVzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSG90YmFySXRlbSB7XHJcbiAgICBpZDogc3RyaW5nLFxyXG4gICAgc2xvdDogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEhvdGJhckRhdGEgPSB7IFt0b2tlbklkOiBzdHJpbmddOiBIb3RiYXJJdGVtW10gfTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSG90YmFyRmxhZ3MgeyBcclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIHRoZSBob3RiYXIgZm9yIGEgcGFydGljdWxhciBlbnRpdHkuXHJcbiAgICAgKiBQT1NUOiBSZXR1cm4gdmFsdWUgaXMgYWx3YXlzIGFuIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSBlbnRpdHkgdGhlIHRva2VuIG9yIGFjdG9yIHRvIGdldCB0aGUgaG90YmFyIGZvci5cclxuICAgICAqL1xyXG4gICAgZ2V0KHRva2VuSWQ6IHN0cmluZyk6IEhvdGJhckRhdGE7XHJcblxyXG4gICAgc2V0KHRva2VuSWQ6IHN0cmluZywgZGF0YTogSG90YmFyRGF0YSk6IFByb21pc2U8RmxhZ2dhYmxlPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZvdW5kcnlIb3RiYXJGbGFncyBpbXBsZW1lbnRzIEhvdGJhckZsYWdzIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2V0RmxhZ1N0cmF0ZWd5OiBGbGFnc1N0cmF0ZWd5KSB7IH1cclxuXHJcbiAgICBnZXQodG9rZW5JZDogc3RyaW5nKTogSG90YmFyRGF0YSB7XHJcbiAgICAgICAgY29uc3QgZmxhZ3MgPSB0aGlzLmdldEZsYWdTdHJhdGVneS5nZXQodG9rZW5JZCk7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZmxhZ3MuZ2V0RmxhZygnd29ybGQnLCBDT05TVEFOVFMubW9kdWxlTmFtZSkgfHwge307XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQodG9rZW5JZDogc3RyaW5nLCBkYXRhOiBIb3RiYXJEYXRhKTogUHJvbWlzZTxGbGFnZ2FibGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGbGFnU3RyYXRlZ3kuZ2V0KHRva2VuSWQpXHJcbiAgICAgICAgICAgIC51bnNldEZsYWcoJ3dvcmxkJywgQ09OU1RBTlRTLm1vZHVsZU5hbWUpXHJcbiAgICAgICAgICAgIC50aGVuKGVudGl0eSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZW50aXR5LnNldEZsYWcoJ3dvcmxkJywgQ09OU1RBTlRTLm1vZHVsZU5hbWUsIGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDT05TVEFOVFMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhZ2VGbGFnIHtcclxuICAgIHB1YmxpYyBnZXQoKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBwYWdlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7Q09OU1RBTlRTLm1vZHVsZU5hbWV9LmFjdGl2ZVBhZ2VgKTtcclxuICAgICAgICBpZiAocGFnZSkgcmV0dXJuICtwYWdlO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQocGFnZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7Q09OU1RBTlRTLm1vZHVsZU5hbWV9LmFjdGl2ZVBhZ2VgLCBwYWdlICsgJycpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSG90YmFyRmxhZ3MsIH0gZnJvbSAnLi4vZmxhZ3MvaG90YmFyRmxhZ3MnO1xyXG5pbXBvcnQgeyBOb3RpZmllciwgSWRlbnRpZmlhYmxlLCBNYWNybywgSVRva2VuLCBJQWN0b3IsIEZsYWdnYWJsZSB9IGZyb20gJy4uL2ZvdW5kcnknO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuLi9sb2dnZXInO1xyXG5pbXBvcnQgeyBGbGFnc1N0cmF0ZWd5LCBJZGVudGl0eUZsYWdzU3RyYXRlZ3kgfSBmcm9tICcuLi9mbGFncy9mbGFnU3RyYXRlZ2llcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgVG9rZW5Ib3RiYXIgeyBcclxuICAgIC8vIERldiBub3RlOiBub3QgZm9uZCBvZiB0aGlzIG1hbnkgcGFyYW1ldGVycy4gXHJcbiAgICAvLyBIb3dldmVyLCBmcm9tIHYzIChzZXBhcmF0ZSBob3RiYXIpIG9uIGF0IGxlYXN0IHR3byB3aWxsIGJlIG9ic29sZXRlIChwYWdlcylcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgaG90YmFyRmxhZzogSG90YmFyRmxhZ3MsXHJcbiAgICAgICAgcHJpdmF0ZSBub3RpZmllcjogTm90aWZpZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBob3RiYXJQYWdlOiBudW1iZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBmbGFnS2V5U3RyYXRlZ3k6IEZsYWdzU3RyYXRlZ3ksXHJcbiAgICAgICAgcHJpdmF0ZSBsb2dnZXI6IExvZ2dlciA9IGNvbnNvbGUpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzYXZlKHRva2VuOiBJZGVudGlmaWFibGUsIG1hY3Jvc1RvU2F2ZTogTWFjcm9bXSwgY2FuU2F2ZTogYm9vbGVhbik6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy5nZXRTbG90cygpO1xyXG4gICAgICAgIG1hY3Jvc1RvU2F2ZSA9IG1hY3Jvc1RvU2F2ZS5maWx0ZXIobSA9PiBtLm1hY3JvICYmIHNsb3RzLmluY2x1ZGVzKG0uc2xvdCkpO1xyXG4gICAgICAgIGNvbnN0IGZsYWdLZXkgPSB0aGlzLmZsYWdLZXlTdHJhdGVneS5nZXQodG9rZW4uaWQpO1xyXG5cclxuICAgICAgICBjb25zdCB0b2tlbkhvdGJhcnMgPSB0aGlzLmhvdGJhckZsYWcuZ2V0KHRva2VuLmlkKTtcclxuICAgICAgICBjb25zdCB0b2tlbkhvdGJhciA9IHRva2VuSG90YmFyc1tmbGFnS2V5LmlkXSB8fCBbXTtcclxuXHJcbiAgICAgICAgLy8gRklYTUU6IHRoaXMgc2VlbXMgdmVyeSBpbmVmZmljaWVudFxyXG4gICAgICAgIC8vICAgICAgICB3aWxsIGJlY29tZSB1bm5lY2Vzc2FyeSBpbiB2My4wLjBcclxuICAgICAgICAvLyAgICAgICAgISBXaWxsIGJlIHVubmVjZXNzYXJ5IHRvIGZpeCBpbiB2My4wLjAgKHNlcGFyYXRlIGhvdGJhciwgYWxsIHBhZ2VzL3Nsb3RzIHdpbGwgYmUgcmVsZXZhbnQpXHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc0NoYW5nZXMobWFjcm9zVG9TYXZlLCB0b2tlbkhvdGJhcikpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoIWNhblNhdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub3RpZmllci53YXJuKCdUaGUgdG9rZW4gaG90YmFyIGlzIGxvY2tlZCBmb3IgcGxheWVycy4gQW55IG1hY3JvcyBwbGFjZWQgb24gdGhpcyBwYWdlIHdpbGwgYmUgcmVwbGFjZWQuJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdbVG9rZW4gSG90YmFyXScsICdwcmVTYXZlJywgZmxhZ0tleSwgdG9rZW5Ib3RiYXJzKTtcclxuXHJcbiAgICAgICAgdG9rZW5Ib3RiYXJzW2ZsYWdLZXkuaWRdID1cclxuICAgICAgICAgICAgbWFjcm9zVG9TYXZlLm1hcChpdGVtID0+IHsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzbG90OiBpdGVtLnNsb3QsIGlkOiBpdGVtLm1hY3JvLmlkIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnW1Rva2VuIEhvdGJhcl0nLCAnU2F2aW5nJywgZmxhZ0tleSwgdG9rZW5Ib3RiYXJzKTtcclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5ob3RiYXJGbGFnLnNldCh0b2tlbi5pZCwgdG9rZW5Ib3RiYXJzKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIHRoZSB0b2tlbiBoYXMgbWFjcm9zIG9uIHRoZSB0b2tlbiBob3RiYXJcclxuICAgIC8vICAgICAgICAgb3RoZXJ3aXNlIGZhbHNlXHJcbiAgICBwdWJsaWMgbG9hZCh0b2tlbjogSVRva2VuLCB1c2VySG90YmFyOiB7IFtzbG90OiBudW1iZXJdOiBzdHJpbmcgfSwgZ2FtZU1hY3JvczogSWRlbnRpZmlhYmxlW10pOiB7IGhhc01hY3JvczogYm9vbGVhbiwgaG90YmFyOiB1bmtub3duIH0ge1xyXG4gICAgICAgIGNvbnN0IHRva2VuSG90YmFycyA9IHRoaXMuaG90YmFyRmxhZy5nZXQodG9rZW4uaWQpO1xyXG4gICAgICAgIGNvbnN0IGZsYWdLZXkgPSB0aGlzLmZsYWdLZXlTdHJhdGVneS5nZXQodG9rZW4uaWQpO1xyXG4gICAgICAgIGNvbnN0IHRva2VuSG90YmFyID0gdG9rZW5Ib3RiYXJzW2ZsYWdLZXkuaWRdIHx8IFtdO1xyXG5cclxuICAgICAgICBpZiAodG9rZW5Ib3RiYXIubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4geyBoYXNNYWNyb3M6IGZhbHNlLCBob3RiYXI6IHVzZXJIb3RiYXIgfTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnW1Rva2VuIEhvdGJhcl0nLCAnTG9hZGluZycsIGZsYWdLZXksIHRva2VuSG90YmFyKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaGFzVmFsaWRNYWNyb3MgPSBmYWxzZTtcclxuICAgICAgICBmb3IoY29uc3Qgc2xvdCBvZiB0aGlzLmdldFNsb3RzKCkpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xvdE1hY3JvID0gdG9rZW5Ib3RiYXIuZmluZChtID0+IG0uc2xvdCA9PSBzbG90KTtcclxuICAgICAgICAgICAgaWYgKCFzbG90TWFjcm8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5zZXQodXNlckhvdGJhciwgc2xvdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbk1hY3JvID0gZ2FtZU1hY3Jvcy5maW5kKG0gPT4gbS5pZCA9PT0gc2xvdE1hY3JvLmlkKTtcclxuICAgICAgICAgICAgICAgIGlmICh0b2tlbk1hY3JvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckhvdGJhcltzbG90XSA9IHRva2VuTWFjcm8uaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVmFsaWRNYWNyb3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNldCh1c2VySG90YmFyLCBzbG90KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHsgaGFzTWFjcm9zOiBoYXNWYWxpZE1hY3JvcywgaG90YmFyOiB1c2VySG90YmFyIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZSh0b2tlbklkOiBzdHJpbmcsIGFjdG9yczogTWFwPHN0cmluZywgSUFjdG9yPiwgdG9rZW5zOiBNYXA8c3RyaW5nLCBJVG9rZW4+KTogUHJvbWlzZTxGbGFnZ2FibGU+IHtcclxuICAgICAgICAvLyB1c2UgdGhlIGRlZmF1bHQgc3RyYXRlZ3ksIGJlY2F1c2Ugb3RoZXJ3aXNlIGEgbGlua2VkIGhvdGJhciBtaWdodCBiZSByZW1vdmVkLlxyXG4gICAgICAgIC8vIEZJWE1FOiBpZGVhbGx5IHRoaXMgc2hvdWxkIG5vdCBiZSBoYXJkIGNvZGVkIGluIGhlcmVcclxuICAgICAgICBjb25zdCBmbGFnS2V5ID0gbmV3IElkZW50aXR5RmxhZ3NTdHJhdGVneShhY3RvcnMsIHRva2VucykuZ2V0KHRva2VuSWQpO1xyXG4gICAgICAgIGNvbnN0IGZsYWdzID0gdGhpcy5ob3RiYXJGbGFnLmdldCh0b2tlbklkKTtcclxuICAgICAgICBkZWxldGUgZmxhZ3NbZmxhZ0tleS5pZF07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaG90YmFyRmxhZy5zZXQodG9rZW5JZCwgZmxhZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U2xvdHMoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gcmFuZ2Uoc2l6ZTogbnVtYmVyLCBzdGFydEF0ID0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gWy4uLkFycmF5KHNpemUpLmtleXMoKV0ubWFwKGkgPT4gaSArIHN0YXJ0QXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJhbmdlKDEwLCAodGhpcy5ob3RiYXJQYWdlIC0gMSkgKiAxMCArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdW5zZXQodXNlckhvdGJhciwgc2xvdDogbnVtYmVyKSB7XHJcbiAgICAgICAgZGVsZXRlIHVzZXJIb3RiYXJbc2xvdF07XHJcbiAgICAgICAgdXNlckhvdGJhcltgLT0ke3Nsb3R9YF0gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFzQ2hhbmdlcyhiYXJNYWNyb3MsIHRva2VuTWFjcm9zKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ1tUb2tlbiBIb3RiYXJdJywgJ0NvbXBhcmluZycsIGJhck1hY3JvcywgdG9rZW5NYWNyb3MpO1xyXG4gICAgICAgIC8vIGNhbnQgbWFrZSBjaGFuZ2VzIGlmIHlvdSBhcmUgbm90IG9uIHRoZSBwYWdlXHJcbiAgICAgICAgaWYgKGJhck1hY3Jvcy5sZW5ndGggIT0gdG9rZW5NYWNyb3MubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGJhck1hY3Jvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYmFyTWFjcm9zW2ldLnNsb3QgIT0gdG9rZW5NYWNyb3NbaV0uc2xvdClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChiYXJNYWNyb3NbaV0ubWFjcm8uX2lkICE9IHRva2VuTWFjcm9zW2ldLmlkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzJztcclxuaW1wb3J0IHsgUGFnZUZsYWcgfSBmcm9tICcuLi9mbGFncy9wYWdlRmxhZyc7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uL2xvZ2dlcic7XHJcblxyXG5pbnRlcmZhY2UgRm91bmRyeUhvdGJhciB7XHJcbiAgICBwYWdlOiBudW1iZXI7XHJcbiAgICByZW5kZXI6IChmb3JjZT86IGJvb2xlYW4pID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VySG90YmFyIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2V0dGluZ3M6IFNldHRpbmdzLCBwcml2YXRlIGhvdGJhcjogRm91bmRyeUhvdGJhciwgcHJpdmF0ZSBwYWdlRmxhZzogUGFnZUZsYWcsIHByaXZhdGUgbG9nZ2VyOiBMb2dnZXIgPSBjb25zb2xlKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZ29Ub1BhZ2UoaGFzVG9rZW5TZWxlY3RlZDogYm9vbGVhbik6IFByb21pc2U8dW5rbm93bj4ge1xyXG4gICAgICAgIGlmIChoYXNUb2tlblNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdvVG9Ub2tlbkhvdGJhcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ29Ub0xhc3RBY3RpdmVQYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb1RvVG9rZW5Ib3RiYXIoKTogUHJvbWlzZTx1bmtub3duPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaG90YmFyLnBhZ2UgIT0gdGhpcy5zZXR0aW5ncy5ob3RiYXJQYWdlKVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2VGbGFnLnNldCh0aGlzLmhvdGJhci5wYWdlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKHRoaXMuc2V0dGluZ3MuaG90YmFyUGFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvVG9MYXN0QWN0aXZlUGFnZSgpOiBQcm9taXNlPHVua25vd24+IHtcclxuICAgICAgICBpZiAodGhpcy5ob3RiYXIucGFnZSAhPSB0aGlzLnNldHRpbmdzLmhvdGJhclBhZ2UpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTsgLy8gdXNlciBhbHJlYWR5IG1vdmVkIGF3YXkgZnJvbSB0aGUgdG9rZW4gaG90YmFyLlxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIodGhpcy5wYWdlRmxhZy5nZXQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXIocGFnZTogbnVtYmVyKTogUHJvbWlzZTx1bmtub3duPiB7XHJcbiAgICAgICAgdGhpcy5ob3RiYXIucGFnZSA9IHBhZ2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgLy8gRklYTUU6IFJlbmRlciBkb2VzIG5vdCBhbHdheXMgd29yayB3aXRob3V0IHRoZSB0aW1lb3V0LlxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG90YmFyLnJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ1tUb2tlbiBIb3RiYXJdJywgJ3JlbmRlcmVkIHBhZ2UnLCBwYWdlKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSwgNSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGludGVyZmFjZSBMb2dnZXIge1xuICAgIGVycm9yKC4uLm1lc3NhZ2U6IHVua25vd25bXSk6IHZvaWQ7XG4gICAgd2FybiguLi5tZXNzYWdlOiB1bmtub3duW10pOiB2b2lkO1xuICAgIGluZm8oLi4ubWVzc2FnZTogdW5rbm93bltdKTogdm9pZDtcbiAgICBkZWJ1ZyguLi5tZXNzYWdlOiB1bmtub3duW10pOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgQ29uc29sZUxvZ2dlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNob3dEZWJ1ZzogYm9vbGVhbiA9IGZhbHNlKSB7IH1cblxuICAgIHN0YXRpYyBpbml0KCk6IHZvaWQge1xuICAgICAgICB3aW5kb3dbJ1Rva2VuSG90YmFyJ10gPSB7IGRlYnVnOiBmYWxzZSB9O1xuICAgIH1cblxuICAgIGVycm9yKC4uLm1lc3NhZ2U6IHVua25vd25bXSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmVycm9yLmFwcGx5KG51bGwsIG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHdhcm4oLi4ubWVzc2FnZTogdW5rbm93bltdKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUud2Fybi5hcHBseShudWxsLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpbmZvKC4uLm1lc3NhZ2U6IHVua25vd25bXSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmluZm8uYXBwbHkobnVsbCwgbWVzc2FnZSk7XG4gICAgfVxuXG4gICAgZGVidWcoLi4ubWVzc2FnZTogdW5rbm93bltdKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNob3dEZWJ1ZylcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcuYXBwbHkobnVsbCwgLi4ubWVzc2FnZSk7XG4gICAgfVxufSIsImltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSAnLi9zZXR0aW5ncyc7XHJcbmltcG9ydCB7IFRva2VuSG90YmFyIH0gZnJvbSAnLi9ob3RiYXIvdG9rZW5Ib3RiYXInO1xyXG5pbXBvcnQgeyBDT05TVEFOVFMgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IEhvdGJhckZsYWdzRmFjdG9yeSwgRmxhZ1N0cmF0ZWd5RmFjdG9yeSB9IGZyb20gJy4vZmxhZ3MvZmFjdG9yeSc7XHJcbmltcG9ydCB7IFVzZXJIb3RiYXIgfSBmcm9tICcuL2hvdGJhci91c2VySG90YmFyJztcclxuaW1wb3J0IHsgUGFnZUZsYWcgfSBmcm9tICcuL2ZsYWdzL3BhZ2VGbGFnJztcclxuaW1wb3J0IHsgQ29uc29sZUxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbi8vIFRPRE86IFJlbW92ZSBpbiB2My4wLjBcclxuZnVuY3Rpb24gbWlncmF0ZUZsYWcoKSB7XHJcbiAgICBsZXQgb2xkRGF0YSA9IGdhbWUudXNlci5nZXRGbGFnKFwid29ybGRcIiwgXCJ0b2tlbi1ob3RiYXJcIik7XHJcbiAgICBsZXQgbmV3RGF0YSA9IGdhbWUudXNlci5nZXRGbGFnKFwid29ybGRcIiwgQ09OU1RBTlRTLm1vZHVsZU5hbWUpO1xyXG4gICAgaWYgKCFvbGREYXRhIHx8IG5ld0RhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiW1Rva2VuIEhvdGJhcl1cIiwgXCJOb3RoaW5nIHRvIG1pZ3JhdGUuXCIsICEhb2xkRGF0YSwgISFuZXdEYXRhKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5pbmZvKFwiW1Rva2VuIEhvdGJhcl1cIiwgXCJNaWdyYXRpbmcgdG8gbmV3IGZsYWcga2V5LlwiKTtcclxuXHJcbiAgICBnYW1lLnVzZXIuc2V0RmxhZyhcIndvcmxkXCIsIENPTlNUQU5UUy5tb2R1bGVOYW1lLCBvbGREYXRhKTtcclxuICAgIGdhbWUudXNlci51bnNldEZsYWcoXCJ3b3JsZFwiLCBcInRva2VuLWhvdGJhclwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVG9rZW5Ib3RiYXIoKSB7XHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncygpLmxvYWQoZ2FtZS5zZXR0aW5ncyk7XHJcbiAgICBjb25zdCBob3RiYXJGbGFncyA9IG5ldyBIb3RiYXJGbGFnc0ZhY3Rvcnkoc2V0dGluZ3MpO1xyXG4gICAgY29uc3Qga2V5U3RyYXRlZ3kgPSBuZXcgRmxhZ1N0cmF0ZWd5RmFjdG9yeShzZXR0aW5ncywgZ2FtZSwgY2FudmFzKTtcclxuICAgIHJldHVybiBuZXcgVG9rZW5Ib3RiYXIoXHJcbiAgICAgICAgaG90YmFyRmxhZ3MuY3JlYXRlKCksXHJcbiAgICAgICAgdWkubm90aWZpY2F0aW9ucyxcclxuICAgICAgICBzZXR0aW5ncy5ob3RiYXJQYWdlLFxyXG4gICAgICAgIGtleVN0cmF0ZWd5LmNyZWF0ZUZsYWdLZXlTdHJhdGVneSgpLFxyXG4gICAgICAgIG5ldyBDb25zb2xlTG9nZ2VyKCg8YW55PndpbmRvdykuVG9rZW5Ib3RiYXIuZGVidWcpKTtcclxufVxyXG5cclxuSG9va3Mub24oXCJpbml0XCIsICgpID0+IHtcclxuICAgIENvbnNvbGVMb2dnZXIuaW5pdCgpO1xyXG5cclxuICAgIGdhbWUuc2V0dGluZ3MucmVnaXN0ZXIoQ09OU1RBTlRTLm1vZHVsZU5hbWUsIFNldHRpbmdzLmtleXMuaG90YmFyUGFnZSwge1xyXG4gICAgICAgIG5hbWU6IFwiUGFnZVwiLFxyXG4gICAgICAgIGhpbnQ6IFwiVGhlIGhvdGJhciBwYWdlIHRoYXQgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSB0b2tlbiBob3RiYXIuIENoYW5naW5nIHRoaXMgd2lsbCB3aXBlIGV4aXN0aW5nIHRva2VuIGJhcnMhXCIsXHJcbiAgICAgICAgc2NvcGU6IFwid29ybGRcIixcclxuICAgICAgICBjb25maWc6IHRydWUsXHJcbiAgICAgICAgZGVmYXVsdDogNSxcclxuICAgICAgICB0eXBlOiBOdW1iZXJcclxuICAgIH0pO1xyXG5cclxuICAgIGdhbWUuc2V0dGluZ3MucmVnaXN0ZXIoQ09OU1RBTlRTLm1vZHVsZU5hbWUsIFNldHRpbmdzLmtleXMubGlua1RvTGlua2VkQWN0b3IsIHtcclxuICAgICAgICBuYW1lOiBcIkxpbmsgdG8gbGlua2VkIGFjdG9yXCIsXHJcbiAgICAgICAgaGludDogXCJMaW5rIHRoZSB0b2tlbiBob3RiYXIgdG8gdGhlIGFjdG9yIGlmIHRoZSB0b2tlbiBpcyBsaW5rZWQuXCIsXHJcbiAgICAgICAgc2NvcGU6IFwid29ybGRcIixcclxuICAgICAgICBjb25maWc6IHRydWUsXHJcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICB0eXBlOiBCb29sZWFuXHJcbiAgICB9KTtcclxuXHJcbiAgICBnYW1lLnNldHRpbmdzLnJlZ2lzdGVyKENPTlNUQU5UUy5tb2R1bGVOYW1lLCBTZXR0aW5ncy5rZXlzLmFsd2F5c0xpbmtUb0FjdG9yLCB7XHJcbiAgICAgICAgbmFtZTogXCJBbHdheXMgbGluayB0byBhY3RvclwiLFxyXG4gICAgICAgIGhpbnQ6IFwiTGluayB0aGUgdG9rZW4gaG90YmFyIHRvIHRoZSBhY3RvciBldmVuIGlmIHRoZSB0b2tlbiBpcyB1bmxpbmtlZC5cIixcclxuICAgICAgICBzY29wZTogXCJ3b3JsZFwiLFxyXG4gICAgICAgIGNvbmZpZzogdHJ1ZSxcclxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICB0eXBlOiBCb29sZWFuXHJcbiAgICB9KTtcclxuXHJcbiAgICBnYW1lLnNldHRpbmdzLnJlZ2lzdGVyKENPTlNUQU5UUy5tb2R1bGVOYW1lLCBTZXR0aW5ncy5rZXlzLnNoYXJlSG90YmFyLCB7XHJcbiAgICAgICAgbmFtZTogXCJTaGFyZSB0aGUgaG90YmFyIHdpdGggb3RoZXIgcGxheWVyc1wiLFxyXG4gICAgICAgIGhpbnQ6IFwiV2hlbiBzZXQgZXZlcnkgdG9rZW4gd2lsbCBoYXZlIGEgc2luZ2xlIGhvdGJhciBzaGFyZWQgYnkgYWxsIHBsYXllcnMuXCIsXHJcbiAgICAgICAgc2NvcGU6IFwid29ybGRcIixcclxuICAgICAgICBjb25maWc6IHRydWUsXHJcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgdHlwZTogQm9vbGVhblxyXG4gICAgfSk7XHJcblxyXG4gICAgZ2FtZS5zZXR0aW5ncy5yZWdpc3RlcihDT05TVEFOVFMubW9kdWxlTmFtZSwgU2V0dGluZ3Mua2V5cy5sb2NrSG90YmFyLCB7XHJcbiAgICAgICAgbmFtZTogXCJMb2NrIHNoYXJlZCBob3RiYXJcIixcclxuICAgICAgICBoaW50OiBcIldoZW4gc2V0LCBvbmx5IGEgR00gY2FuIHVwZGF0ZSB0aGUgdG9rZW4gaG90YmFyLiBPbmx5IGFwcGxpZXMgdG8gc2hhcmVkIGhvdGJhcnMuXCIsXHJcbiAgICAgICAgc2NvcGU6IFwid29ybGRcIixcclxuICAgICAgICBjb25maWc6IHRydWUsXHJcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgdHlwZTogQm9vbGVhblxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJbVG9rZW4gSG90YmFyXVwiLCBcIkluaXRpYWxpemVkIFRva2VuIEhvdGJhclwiKTtcclxuICAgIHNldFRpbWVvdXQobWlncmF0ZUZsYWcsIDIwMCk7XHJcbn0pO1xyXG5cclxuSG9va3Mub24oXCJyZW5kZXJIb3RiYXJcIiwgKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgLy8gY29uc3QgbWFjcm9zID0gZGF0YS5tYWNyb3M7XHJcbiAgICAvLyBGSVhNRTogZHVlIHRvIGEgcmFjZSBjb25kaXRpb24sIHNvbWV0aW1lcyB0aGUgd3JvbmcgbWFjcm9zIGFyZSBwYXNzZWQuXHJcbiAgICAvLyAgICAgICAgV2UgYXJlIG9ubHkgaW50ZXJlc3RlZCBpbiB0aGUgb25lcyBvbiB0aGUgdG9rZW4gaG90YmFyLlxyXG4gICAgLy8gICAgICAgICEgV2lsbCBiZSB1bm5lY2Vzc2FyeSB0byBmaXggaW4gdjMuMC4wIChzZXBhcmF0ZSBob3RiYXIsIGFsbCBwYWdlcy9zbG90cyB3aWxsIGJlIHJlbGV2YW50KVxyXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoKS5sb2FkKGdhbWUuc2V0dGluZ3MpO1xyXG4gICAgY29uc3QgbWFjcm9zID0gKDxhbnk+dWkpLmhvdGJhci5fZ2V0TWFjcm9zQnlQYWdlKHNldHRpbmdzLmhvdGJhclBhZ2UpO1xyXG5cclxuICAgIGNvbnN0IHRva2VuID0gY2FudmFzLnRva2Vucy5jb250cm9sbGVkWzBdO1xyXG4gICAgaWYgKHRva2VuICYmIHNldHRpbmdzLmhvdGJhclBhZ2UgPT09ICg8YW55PnVpKS5ob3RiYXIucGFnZSlcclxuICAgICAgICBjcmVhdGVUb2tlbkhvdGJhcigpLnNhdmUodG9rZW4sIG1hY3JvcywgIXNldHRpbmdzLmxvY2tIb3RiYXIgfHwgZ2FtZS51c2VyLmlzR00pO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn0pO1xyXG5cclxuSG9va3Mub24oXCJjb250cm9sVG9rZW5cIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSBjYW52YXMudG9rZW5zLmNvbnRyb2xsZWRbMF07XHJcblxyXG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IENvbnNvbGVMb2dnZXIoKTtcclxuICAgIGNvbnN0IHVpSG90YmFyID0gbmV3IFVzZXJIb3RiYXIobmV3IFNldHRpbmdzKCkubG9hZChnYW1lLnNldHRpbmdzKSwgKDxhbnk+dWkpLmhvdGJhciwgbmV3IFBhZ2VGbGFnKCksIGxvZ2dlcik7XHJcbiAgICBpZiAodG9rZW4gJiYgY2FudmFzLnRva2Vucy5jb250cm9sbGVkLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgLy8gaG90YmFyIGRvZXMgbm90IHlldCBleGlzdCBvbiBnYW1lLnVzZXIuZGF0YSBhbmQgdWkgZGVmaW5pdGlvbnMsIGhlbmNlIHRoZSBjYXN0cyB0byBhbnkuXHJcbiAgICAgICAgbG9nZ2VyLmRlYnVnKFwiW1Rva2VuIEhvdGJhcl1cIiwgXCJjb250cm9sbGVkIHRva2VuXCIsIHRva2VuKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gY3JlYXRlVG9rZW5Ib3RiYXIoKVxyXG4gICAgICAgICAgICAubG9hZCh0b2tlbiwgZHVwbGljYXRlKCg8YW55PmdhbWUudXNlci5kYXRhKS5ob3RiYXIpLCBnYW1lLm1hY3Jvcy5lbnRpdGllcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHJlc3VsdC5oYXNNYWNyb3MpIHtcclxuICAgICAgICAgICAgYXdhaXQgZ2FtZS51c2VyLnVwZGF0ZSh7aG90YmFyOiByZXN1bHQuaG90YmFyfSk7XHJcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhcIltUb2tlbiBIb3RiYXJdXCIsIFwidXBkYXRlZCBob3RiYXJcIiwgdG9rZW4sIHJlc3VsdC5ob3RiYXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1aUhvdGJhci5nb1RvUGFnZShyZXN1bHQuaGFzTWFjcm9zKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHVpSG90YmFyLmdvVG9QYWdlKGZhbHNlKTtcclxuICAgICAgICBsb2dnZXIuZGVidWcoXCJbVG9rZW4gSG90YmFyXVwiLCBcIk5vIG9yIG11bHRpcGxlIGNvbnRyb2xsZWQgdG9rZW5zXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn0pO1xyXG5cclxuSG9va3Mub24oXCJwcmVEZWxldGVUb2tlblwiLCAoXzogU2NlbmUsIHRva2VuOiBhbnkpID0+IHtcclxuICAgIGNyZWF0ZVRva2VuSG90YmFyKCkucmVtb3ZlKHRva2VuLl9pZCwgZ2FtZS5hY3RvcnMsIGNhbnZhcy50b2tlbnMpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn0pO1xyXG5cclxuSG9va3Mub24oXCJwcmVEZWxldGVBY3RvclwiLCAoYWN0b3I6IGFueSkgPT4ge1xyXG4gICAgY3JlYXRlVG9rZW5Ib3RiYXIoKS5yZW1vdmUoYWN0b3IuZGF0YS5faWQsIGdhbWUuYWN0b3JzLCBjYW52YXMudG9rZW5zKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59KTtcclxuXHJcbkhvb2tzLm9uKFwicmVhZHlcIiwgKCkgPT4ge1xyXG4gICAgbWlncmF0ZUZsYWcoKTtcclxufSk7IiwiaW1wb3J0IHsgQ09OU1RBTlRTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDbGllbnRTZXR0aW5nc1JlYWRlciB7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgZ2V0KHNjb3BlOiBzdHJpbmcsIGtleTogc3RyaW5nKTogYW55O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2V0dGluZ3Mge1xyXG4gICAgYWx3YXlzTGlua1RvQWN0b3I6IGJvb2xlYW47XHJcbiAgICBsaW5rVG9MaW5rZWRBY3RvcjogYm9vbGVhbjtcclxuICAgIGhvdGJhclBhZ2U6IG51bWJlcjtcclxuICAgIHNoYXJlSG90YmFyOiBib29sZWFuO1xyXG4gICAgbG9ja0hvdGJhcjogYm9vbGVhbjtcclxuXHJcbiAgICBzdGF0aWMga2V5cyA9IHtcclxuICAgICAgICBhbHdheXNMaW5rVG9BY3RvcjogJ2xpbmtUb0FjdG9yJyxcclxuICAgICAgICBsaW5rVG9MaW5rZWRBY3RvcjogJ2xpbmsnLFxyXG4gICAgICAgIGhvdGJhclBhZ2U6ICdwYWdlJyxcclxuICAgICAgICBzaGFyZUhvdGJhcjogJ3NoYXJlJyxcclxuICAgICAgICBsb2NrSG90YmFyOiAnbG9jaydcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZChzOiBDbGllbnRTZXR0aW5nc1JlYWRlcikgOiBTZXR0aW5ncyB7XHJcbiAgICAgICAgdGhpcy5ob3RiYXJQYWdlID0gdGhpcy5nZXRTZXR0aW5nKHMsIFNldHRpbmdzLmtleXMuaG90YmFyUGFnZSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWx3YXlzTGlua1RvQWN0b3IgPSB0aGlzLmdldFNldHRpbmcocywgU2V0dGluZ3Mua2V5cy5hbHdheXNMaW5rVG9BY3Rvcik7XHJcbiAgICAgICAgdGhpcy5saW5rVG9MaW5rZWRBY3RvciA9IHRoaXMuZ2V0U2V0dGluZyhzLCBTZXR0aW5ncy5rZXlzLmxpbmtUb0xpbmtlZEFjdG9yKSB8fCB0aGlzLmFsd2F5c0xpbmtUb0FjdG9yO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXJlSG90YmFyID0gdGhpcy5nZXRTZXR0aW5nKHMsIFNldHRpbmdzLmtleXMuc2hhcmVIb3RiYXIpO1xyXG4gICAgICAgIHRoaXMubG9ja0hvdGJhciA9IHRoaXMuZ2V0U2V0dGluZyhzLCBTZXR0aW5ncy5rZXlzLmxvY2tIb3RiYXIpICYmIHRoaXMuc2hhcmVIb3RiYXI7XHJcbiAgICBcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNldHRpbmcoc2V0dGluZ3M6IENsaWVudFNldHRpbmdzUmVhZGVyLCBrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncy5nZXQoQ09OU1RBTlRTLm1vZHVsZU5hbWUsIGtleSk7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9