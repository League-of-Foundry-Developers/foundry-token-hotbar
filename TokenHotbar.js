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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZmxhZ3MvZmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZmxhZ3MvZmxhZ1N0cmF0ZWdpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsYWdzL2hvdGJhckZsYWdzLnRzIiwid2VicGFjazovLy8uL3NyYy9mbGFncy9wYWdlRmxhZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaG90YmFyL3Rva2VuSG90YmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9ob3RiYXIvdXNlckhvdGJhci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNB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ZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsImV4cG9ydCBjb25zdCBDT05TVEFOVFMgPSB7XHJcbiAgICBtb2R1bGVOYW1lOiAnVG9rZW5Ib3RiYXInLFxyXG59OyIsImltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3MnO1xyXG5pbXBvcnQgeyBGb3VuZHJ5SG90YmFyRmxhZ3MsIEhvdGJhckZsYWdzIH0gZnJvbSAnLi9ob3RiYXJGbGFncyc7XHJcbmltcG9ydCB7IElkZW50aXR5RmxhZ3NTdHJhdGVneSwgVXNlckZsYWdzU3RyYXRlZ3ksIExpbmtlZEZsYWdzU3RyYXRlZ3ksIEFsd2F5c0xpbmtlZEZsYWdzU3RyYXRlZ3ksIEZsYWdzU3RyYXRlZ3kgfSBmcm9tICcuL2ZsYWdTdHJhdGVnaWVzJztcclxuaW1wb3J0IHsgR2FtZSwgQ2FudmFzIH0gZnJvbSAnLi4vZm91bmRyeSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSG90YmFyRmxhZ3NGYWN0b3J5IHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2V0dGluZ3M6IFNldHRpbmdzKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlKCk6IEhvdGJhckZsYWdzIHtcclxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gbmV3IEZsYWdTdHJhdGVneUZhY3RvcnkodGhpcy5zZXR0aW5ncywgZ2FtZSwgY2FudmFzKTtcclxuICAgICAgICByZXR1cm4gbmV3IEZvdW5kcnlIb3RiYXJGbGFncyhmYWN0b3J5LmNyZWF0ZUZsYWdTdHJhdGVneSgpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZsYWdTdHJhdGVneUZhY3Rvcnkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2V0dGluZ3M6IFNldHRpbmdzLCBwcml2YXRlIGdhbWU6IEdhbWUsIHByaXZhdGUgY2FudmFzOiBDYW52YXMpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVGbGFnU3RyYXRlZ3koKTogRmxhZ3NTdHJhdGVneSAge1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNoYXJlSG90YmFyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFsd2F5c0xpbmtUb0FjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFsd2F5c0xpbmtlZEZsYWdzU3RyYXRlZ3kodGhpcy5nYW1lLmFjdG9ycywgdGhpcy5jYW52YXMudG9rZW5zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5saW5rVG9MaW5rZWRBY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBMaW5rZWRGbGFnc1N0cmF0ZWd5KHRoaXMuZ2FtZS5hY3RvcnMsIHRoaXMuY2FudmFzLnRva2Vucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJZGVudGl0eUZsYWdzU3RyYXRlZ3kodGhpcy5nYW1lLmFjdG9ycywgdGhpcy5jYW52YXMudG9rZW5zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVc2VyRmxhZ3NTdHJhdGVneSh0aGlzLmdhbWUudXNlciwgdGhpcy5nYW1lLmFjdG9ycywgdGhpcy5jYW52YXMudG9rZW5zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlRmxhZ0tleVN0cmF0ZWd5KCk6IEZsYWdzU3RyYXRlZ3kge1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFsd2F5c0xpbmtUb0FjdG9yKVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFsd2F5c0xpbmtlZEZsYWdzU3RyYXRlZ3kodGhpcy5nYW1lLmFjdG9ycywgdGhpcy5jYW52YXMudG9rZW5zKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubGlua1RvTGlua2VkQWN0b3IpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGlua2VkRmxhZ3NTdHJhdGVneSh0aGlzLmdhbWUuYWN0b3JzLCB0aGlzLmNhbnZhcy50b2tlbnMpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IElkZW50aXR5RmxhZ3NTdHJhdGVneSh0aGlzLmdhbWUuYWN0b3JzLCB0aGlzLmNhbnZhcy50b2tlbnMpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEZsYWdnYWJsZSwgSUFjdG9yLCBJVG9rZW4gfSBmcm9tICcuLi9mb3VuZHJ5JztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGbGFnc1N0cmF0ZWd5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYWN0b3JzOiBNYXA8c3RyaW5nLCBJQWN0b3I+LCBwcm90ZWN0ZWQgdG9rZW5zOiBNYXA8c3RyaW5nLCBJVG9rZW4+KSB7IH1cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGVudGl0eUlkIFRoZSBpZCBvZiB0aGUgYWN0b3Igb3IgdG9rZW5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0KGVudGl0eUlkOiBzdHJpbmcpOiBGbGFnZ2FibGU7XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldEVudGl0eShlbnRpdHlJZDogc3RyaW5nKSA6IElBY3RvciB8IElUb2tlbiB7XHJcbiAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5hY3RvcnMuZ2V0KGVudGl0eUlkKSB8fCB0aGlzLnRva2Vucy5nZXQoZW50aXR5SWQpOyBcclxuICAgICAgICBpZiAoIWVudGl0eSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGFjdG9yIG9yIHRva2VuIGV4aXN0cyB3aXRoIGlkICcke2VudGl0eUlkfSdgKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIHJldHVybiBlbnRpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGlzVG9rZW4oZW50aXR5OiBJVG9rZW4gfCBJQWN0b3IpOiBlbnRpdHkgaXMgSVRva2VuIHtcclxuICAgICAgICByZXR1cm4gJ2FjdG9yJyBpbiBlbnRpdHk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VyRmxhZ3NTdHJhdGVneSBleHRlbmRzIEZsYWdzU3RyYXRlZ3kge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2VyOiBGbGFnZ2FibGUsIGFjdG9yczogTWFwPHN0cmluZywgSUFjdG9yPiwgdG9rZW5zOiBNYXA8c3RyaW5nLCBJVG9rZW4+KSB7IFxyXG4gICAgICAgIHN1cGVyKGFjdG9ycywgdG9rZW5zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICBnZXQoX2VudGl0eUlkOiBzdHJpbmcpOiBGbGFnZ2FibGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJZGVudGl0eUZsYWdzU3RyYXRlZ3kgZXh0ZW5kcyBGbGFnc1N0cmF0ZWd5IHtcclxuICAgIGNvbnN0cnVjdG9yKGFjdG9yczogTWFwPHN0cmluZywgSUFjdG9yPiwgdG9rZW5zOiBNYXA8c3RyaW5nLCBJVG9rZW4+KSB7IFxyXG4gICAgICAgIHN1cGVyKGFjdG9ycywgdG9rZW5zKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQoZW50aXR5SWQ6IHN0cmluZyk6IEZsYWdnYWJsZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RW50aXR5KGVudGl0eUlkKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpbmtlZEZsYWdzU3RyYXRlZ3kgZXh0ZW5kcyBGbGFnc1N0cmF0ZWd5IHtcclxuICAgIGdldChlbnRpdHlJZDogc3RyaW5nKTogRmxhZ2dhYmxlIHtcclxuICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLmdldEVudGl0eShlbnRpdHlJZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNUb2tlbihlbnRpdHkpICYmIGVudGl0eS5kYXRhLmFjdG9yTGluayAmJiBlbnRpdHkuYWN0b3JcclxuICAgICAgICAgICAgPyBlbnRpdHkuYWN0b3JcclxuICAgICAgICAgICAgOiBlbnRpdHk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBbHdheXNMaW5rZWRGbGFnc1N0cmF0ZWd5IGV4dGVuZHMgRmxhZ3NTdHJhdGVneSB7XHJcbiAgICBnZXQoZW50aXR5SWQ6IHN0cmluZyk6IEZsYWdnYWJsZSB7XHJcbiAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5nZXRFbnRpdHkoZW50aXR5SWQpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzVG9rZW4oZW50aXR5KSAmJiBlbnRpdHkuYWN0b3IpXHJcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHkuYWN0b3I7XHJcblxyXG4gICAgICAgIHJldHVybiBlbnRpdHk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDT05TVEFOVFMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBGbGFnZ2FibGUgfSBmcm9tICcuLi9mb3VuZHJ5JztcclxuaW1wb3J0IHsgRmxhZ3NTdHJhdGVneSB9IGZyb20gJy4vZmxhZ1N0cmF0ZWdpZXMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIb3RiYXJJdGVtIHtcclxuICAgIGlkOiBzdHJpbmcsXHJcbiAgICBzbG90OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgSG90YmFyRGF0YSA9IHsgW3Rva2VuSWQ6IHN0cmluZ106IEhvdGJhckl0ZW1bXSB9O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIb3RiYXJGbGFncyB7IFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGhvdGJhciBmb3IgYSBwYXJ0aWN1bGFyIGVudGl0eS5cclxuICAgICAqIFBPU1Q6IFJldHVybiB2YWx1ZSBpcyBhbHdheXMgYW4gb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIGVudGl0eSB0aGUgdG9rZW4gb3IgYWN0b3IgdG8gZ2V0IHRoZSBob3RiYXIgZm9yLlxyXG4gICAgICovXHJcbiAgICBnZXQodG9rZW5JZDogc3RyaW5nKTogSG90YmFyRGF0YTtcclxuXHJcbiAgICBzZXQodG9rZW5JZDogc3RyaW5nLCBkYXRhOiBIb3RiYXJEYXRhKTogUHJvbWlzZTxGbGFnZ2FibGU+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRm91bmRyeUhvdGJhckZsYWdzIGltcGxlbWVudHMgSG90YmFyRmxhZ3Mge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBnZXRGbGFnU3RyYXRlZ3k6IEZsYWdzU3RyYXRlZ3kpIHsgfVxyXG5cclxuICAgIGdldCh0b2tlbklkOiBzdHJpbmcpOiBIb3RiYXJEYXRhIHtcclxuICAgICAgICBjb25zdCBmbGFncyA9IHRoaXMuZ2V0RmxhZ1N0cmF0ZWd5LmdldCh0b2tlbklkKTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBmbGFncy5nZXRGbGFnKCd3b3JsZCcsIENPTlNUQU5UUy5tb2R1bGVOYW1lKSB8fCB7fTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCh0b2tlbklkOiBzdHJpbmcsIGRhdGE6IEhvdGJhckRhdGEpOiBQcm9taXNlPEZsYWdnYWJsZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEZsYWdTdHJhdGVneS5nZXQodG9rZW5JZClcclxuICAgICAgICAgICAgLnVuc2V0RmxhZygnd29ybGQnLCBDT05TVEFOVFMubW9kdWxlTmFtZSlcclxuICAgICAgICAgICAgLnRoZW4oZW50aXR5ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHkuc2V0RmxhZygnd29ybGQnLCBDT05TVEFOVFMubW9kdWxlTmFtZSwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IENPTlNUQU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFnZUZsYWcge1xyXG4gICAgcHVibGljIGdldCgpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHBhZ2UgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtDT05TVEFOVFMubW9kdWxlTmFtZX0uYWN0aXZlUGFnZWApO1xyXG4gICAgICAgIGlmIChwYWdlKSByZXR1cm4gK3BhZ2U7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldChwYWdlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHtDT05TVEFOVFMubW9kdWxlTmFtZX0uYWN0aXZlUGFnZWAsIHBhZ2UgKyAnJyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBIb3RiYXJGbGFncywgfSBmcm9tICcuLi9mbGFncy9ob3RiYXJGbGFncyc7XHJcbmltcG9ydCB7IE5vdGlmaWVyLCBJZGVudGlmaWFibGUsIE1hY3JvLCBJVG9rZW4sIElBY3RvciwgRmxhZ2dhYmxlIH0gZnJvbSAnLi4vZm91bmRyeSc7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uL2xvZ2dlcic7XHJcbmltcG9ydCB7IEZsYWdzU3RyYXRlZ3ksIElkZW50aXR5RmxhZ3NTdHJhdGVneSB9IGZyb20gJy4uL2ZsYWdzL2ZsYWdTdHJhdGVnaWVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUb2tlbkhvdGJhciB7IFxyXG4gICAgLy8gRGV2IG5vdGU6IG5vdCBmb25kIG9mIHRoaXMgbWFueSBwYXJhbWV0ZXJzLiBcclxuICAgIC8vIEhvd2V2ZXIsIGZyb20gdjMgKHNlcGFyYXRlIGhvdGJhcikgb24gYXQgbGVhc3QgdHdvIHdpbGwgYmUgb2Jzb2xldGUgKHBhZ2VzKVxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBob3RiYXJGbGFnOiBIb3RiYXJGbGFncyxcclxuICAgICAgICBwcml2YXRlIG5vdGlmaWVyOiBOb3RpZmllcixcclxuICAgICAgICBwcml2YXRlIGhvdGJhclBhZ2U6IG51bWJlcixcclxuICAgICAgICBwcml2YXRlIGZsYWdLZXlTdHJhdGVneTogRmxhZ3NTdHJhdGVneSxcclxuICAgICAgICBwcml2YXRlIGxvZ2dlcjogTG9nZ2VyID0gY29uc29sZSkgeyB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNhdmUodG9rZW46IElkZW50aWZpYWJsZSwgbWFjcm9zVG9TYXZlOiBNYWNyb1tdLCBjYW5TYXZlOiBib29sZWFuKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldFNsb3RzKCk7XHJcbiAgICAgICAgbWFjcm9zVG9TYXZlID0gbWFjcm9zVG9TYXZlLmZpbHRlcihtID0+IG0ubWFjcm8gJiYgc2xvdHMuaW5jbHVkZXMobS5zbG90KSk7XHJcbiAgICAgICAgY29uc3QgZmxhZ0tleSA9IHRoaXMuZmxhZ0tleVN0cmF0ZWd5LmdldCh0b2tlbi5pZCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRva2VuSG90YmFycyA9IHRoaXMuaG90YmFyRmxhZy5nZXQodG9rZW4uaWQpO1xyXG4gICAgICAgIGNvbnN0IHRva2VuSG90YmFyID0gdG9rZW5Ib3RiYXJzW2ZsYWdLZXkuaWRdIHx8IFtdO1xyXG5cclxuICAgICAgICAvLyBGSVhNRTogdGhpcyBzZWVtcyB2ZXJ5IGluZWZmaWNpZW50XHJcbiAgICAgICAgLy8gICAgICAgIHdpbGwgYmVjb21lIHVubmVjZXNzYXJ5IGluIHYzLjAuMFxyXG4gICAgICAgIC8vICAgICAgICAhIFdpbGwgYmUgdW5uZWNlc3NhcnkgdG8gZml4IGluIHYzLjAuMCAoc2VwYXJhdGUgaG90YmFyLCBhbGwgcGFnZXMvc2xvdHMgd2lsbCBiZSByZWxldmFudClcclxuICAgICAgICBpZiAoIXRoaXMuaGFzQ2hhbmdlcyhtYWNyb3NUb1NhdmUsIHRva2VuSG90YmFyKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICghY2FuU2F2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vdGlmaWVyLndhcm4oJ1RoZSB0b2tlbiBob3RiYXIgaXMgbG9ja2VkIGZvciBwbGF5ZXJzLiBBbnkgbWFjcm9zIHBsYWNlZCBvbiB0aGlzIHBhZ2Ugd2lsbCBiZSByZXBsYWNlZC4nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ1tUb2tlbiBIb3RiYXJdJywgJ3ByZVNhdmUnLCBmbGFnS2V5LCB0b2tlbkhvdGJhcnMpO1xyXG5cclxuICAgICAgICB0b2tlbkhvdGJhcnNbZmxhZ0tleS5pZF0gPVxyXG4gICAgICAgICAgICBtYWNyb3NUb1NhdmUubWFwKGl0ZW0gPT4geyBcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHNsb3Q6IGl0ZW0uc2xvdCwgaWQ6IGl0ZW0ubWFjcm8uaWQgfTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdbVG9rZW4gSG90YmFyXScsICdTYXZpbmcnLCBmbGFnS2V5LCB0b2tlbkhvdGJhcnMpO1xyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLmhvdGJhckZsYWcuc2V0KHRva2VuLmlkLCB0b2tlbkhvdGJhcnMpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgdGhlIHRva2VuIGhhcyBtYWNyb3Mgb24gdGhlIHRva2VuIGhvdGJhclxyXG4gICAgLy8gICAgICAgICBvdGhlcndpc2UgZmFsc2VcclxuICAgIHB1YmxpYyBsb2FkKHRva2VuOiBJVG9rZW4sIHVzZXJIb3RiYXI6IHsgW3Nsb3Q6IG51bWJlcl06IHN0cmluZyB9LCBnYW1lTWFjcm9zOiBJZGVudGlmaWFibGVbXSk6IHsgaGFzTWFjcm9zOiBib29sZWFuLCBob3RiYXI6IHVua25vd24gfSB7XHJcbiAgICAgICAgY29uc3QgdG9rZW5Ib3RiYXJzID0gdGhpcy5ob3RiYXJGbGFnLmdldCh0b2tlbi5pZCk7XHJcbiAgICAgICAgY29uc3QgZmxhZ0tleSA9IHRoaXMuZmxhZ0tleVN0cmF0ZWd5LmdldCh0b2tlbi5pZCk7XHJcbiAgICAgICAgY29uc3QgdG9rZW5Ib3RiYXIgPSB0b2tlbkhvdGJhcnNbZmxhZ0tleS5pZF0gfHwgW107XHJcblxyXG4gICAgICAgIGlmICh0b2tlbkhvdGJhci5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgIHJldHVybiB7IGhhc01hY3JvczogZmFsc2UsIGhvdGJhcjogdXNlckhvdGJhciB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdbVG9rZW4gSG90YmFyXScsICdMb2FkaW5nJywgZmxhZ0tleSwgdG9rZW5Ib3RiYXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBoYXNWYWxpZE1hY3JvcyA9IGZhbHNlO1xyXG4gICAgICAgIGZvcihjb25zdCBzbG90IG9mIHRoaXMuZ2V0U2xvdHMoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzbG90TWFjcm8gPSB0b2tlbkhvdGJhci5maW5kKG0gPT4gbS5zbG90ID09IHNsb3QpO1xyXG4gICAgICAgICAgICBpZiAoIXNsb3RNYWNybykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNldCh1c2VySG90YmFyLCBzbG90KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuTWFjcm8gPSBnYW1lTWFjcm9zLmZpbmQobSA9PiBtLmlkID09PSBzbG90TWFjcm8uaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuTWFjcm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VySG90YmFyW3Nsb3RdID0gdG9rZW5NYWNyby5pZDtcclxuICAgICAgICAgICAgICAgICAgICBoYXNWYWxpZE1hY3JvcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2V0KHVzZXJIb3RiYXIsIHNsb3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geyBoYXNNYWNyb3M6IGhhc1ZhbGlkTWFjcm9zLCBob3RiYXI6IHVzZXJIb3RiYXIgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlKHRva2VuSWQ6IHN0cmluZywgYWN0b3JzOiBNYXA8c3RyaW5nLCBJQWN0b3I+LCB0b2tlbnM6IE1hcDxzdHJpbmcsIElUb2tlbj4pOiBQcm9taXNlPEZsYWdnYWJsZT4ge1xyXG4gICAgICAgIC8vIHVzZSB0aGUgZGVmYXVsdCBzdHJhdGVneSwgYmVjYXVzZSBvdGhlcndpc2UgYSBsaW5rZWQgaG90YmFyIG1pZ2h0IGJlIHJlbW92ZWQuXHJcbiAgICAgICAgLy8gRklYTUU6IGlkZWFsbHkgdGhpcyBzaG91bGQgbm90IGJlIGhhcmQgY29kZWQgaW4gaGVyZVxyXG4gICAgICAgIGNvbnN0IGZsYWdLZXkgPSBuZXcgSWRlbnRpdHlGbGFnc1N0cmF0ZWd5KGFjdG9ycywgdG9rZW5zKS5nZXQodG9rZW5JZCk7XHJcbiAgICAgICAgY29uc3QgZmxhZ3MgPSB0aGlzLmhvdGJhckZsYWcuZ2V0KHRva2VuSWQpO1xyXG4gICAgICAgIGRlbGV0ZSBmbGFnc1tmbGFnS2V5LmlkXTtcclxuICAgICAgICByZXR1cm4gdGhpcy5ob3RiYXJGbGFnLnNldCh0b2tlbklkLCBmbGFncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTbG90cygpIHtcclxuICAgICAgICBmdW5jdGlvbiByYW5nZShzaXplOiBudW1iZXIsIHN0YXJ0QXQgPSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbLi4uQXJyYXkoc2l6ZSkua2V5cygpXS5tYXAoaSA9PiBpICsgc3RhcnRBdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmFuZ2UoMTAsICh0aGlzLmhvdGJhclBhZ2UgLSAxKSAqIDEwICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bnNldCh1c2VySG90YmFyLCBzbG90OiBudW1iZXIpIHtcclxuICAgICAgICBkZWxldGUgdXNlckhvdGJhcltzbG90XTtcclxuICAgICAgICB1c2VySG90YmFyW2AtPSR7c2xvdH1gXSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYXNDaGFuZ2VzKGJhck1hY3JvcywgdG9rZW5NYWNyb3MpIHtcclxuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnW1Rva2VuIEhvdGJhcl0nLCAnQ29tcGFyaW5nJywgYmFyTWFjcm9zLCB0b2tlbk1hY3Jvcyk7XHJcbiAgICAgICAgLy8gY2FudCBtYWtlIGNoYW5nZXMgaWYgeW91IGFyZSBub3Qgb24gdGhlIHBhZ2VcclxuICAgICAgICBpZiAoYmFyTWFjcm9zLmxlbmd0aCAhPSB0b2tlbk1hY3Jvcy5sZW5ndGgpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYmFyTWFjcm9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChiYXJNYWNyb3NbaV0uc2xvdCAhPSB0b2tlbk1hY3Jvc1tpXS5zbG90KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGJhck1hY3Jvc1tpXS5tYWNyby5faWQgIT0gdG9rZW5NYWNyb3NbaV0uaWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3MnO1xyXG5pbXBvcnQgeyBQYWdlRmxhZyB9IGZyb20gJy4uL2ZsYWdzL3BhZ2VGbGFnJztcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi4vbG9nZ2VyJztcclxuXHJcbmludGVyZmFjZSBGb3VuZHJ5SG90YmFyIHtcclxuICAgIHBhZ2U6IG51bWJlcjtcclxuICAgIHJlbmRlcjogKGZvcmNlPzogYm9vbGVhbikgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJIb3RiYXIge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXR0aW5nczogU2V0dGluZ3MsIHByaXZhdGUgaG90YmFyOiBGb3VuZHJ5SG90YmFyLCBwcml2YXRlIHBhZ2VGbGFnOiBQYWdlRmxhZywgcHJpdmF0ZSBsb2dnZXI6IExvZ2dlciA9IGNvbnNvbGUpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBnb1RvUGFnZShoYXNUb2tlblNlbGVjdGVkOiBib29sZWFuKTogUHJvbWlzZTx1bmtub3duPiB7XHJcbiAgICAgICAgaWYgKGhhc1Rva2VuU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ29Ub1Rva2VuSG90YmFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nb1RvTGFzdEFjdGl2ZVBhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvVG9Ub2tlbkhvdGJhcigpOiBQcm9taXNlPHVua25vd24+IHtcclxuICAgICAgICBpZiAodGhpcy5ob3RiYXIucGFnZSAhPSB0aGlzLnNldHRpbmdzLmhvdGJhclBhZ2UpXHJcbiAgICAgICAgICAgIHRoaXMucGFnZUZsYWcuc2V0KHRoaXMuaG90YmFyLnBhZ2UpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIodGhpcy5zZXR0aW5ncy5ob3RiYXJQYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29Ub0xhc3RBY3RpdmVQYWdlKCk6IFByb21pc2U8dW5rbm93bj4ge1xyXG4gICAgICAgIGlmICh0aGlzLmhvdGJhci5wYWdlICE9IHRoaXMuc2V0dGluZ3MuaG90YmFyUGFnZSlcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpOyAvLyB1c2VyIGFscmVhZHkgbW92ZWQgYXdheSBmcm9tIHRoZSB0b2tlbiBob3RiYXIuXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0aGlzLnBhZ2VGbGFnLmdldCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlcihwYWdlOiBudW1iZXIpOiBQcm9taXNlPHVua25vd24+IHtcclxuICAgICAgICB0aGlzLmhvdGJhci5wYWdlID0gcGFnZTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAvLyBGSVhNRTogUmVuZGVyIGRvZXMgbm90IGFsd2F5cyB3b3JrIHdpdGhvdXQgdGhlIHRpbWVvdXQuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RiYXIucmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnW1Rva2VuIEhvdGJhcl0nLCAncmVuZGVyZWQgcGFnZScsIHBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9LCA1KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIExvZ2dlciB7XG4gICAgZXJyb3IoLi4ubWVzc2FnZTogdW5rbm93bltdKTogdm9pZDtcbiAgICB3YXJuKC4uLm1lc3NhZ2U6IHVua25vd25bXSk6IHZvaWQ7XG4gICAgaW5mbyguLi5tZXNzYWdlOiB1bmtub3duW10pOiB2b2lkO1xuICAgIGRlYnVnKC4uLm1lc3NhZ2U6IHVua25vd25bXSk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBDb25zb2xlTG9nZ2VyIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2hvd0RlYnVnOiBib29sZWFuID0gZmFsc2UpIHsgfVxuXG4gICAgc3RhdGljIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHdpbmRvd1snVG9rZW5Ib3RiYXInXSA9IHsgZGVidWc6IGZhbHNlIH07XG4gICAgfVxuXG4gICAgZXJyb3IoLi4ubWVzc2FnZTogdW5rbm93bltdKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkobnVsbCwgbWVzc2FnZSk7XG4gICAgfVxuXG4gICAgd2FybiguLi5tZXNzYWdlOiB1bmtub3duW10pOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS53YXJuLmFwcGx5KG51bGwsIG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGluZm8oLi4ubWVzc2FnZTogdW5rbm93bltdKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShudWxsLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBkZWJ1ZyguLi5tZXNzYWdlOiB1bmtub3duW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd0RlYnVnKVxuICAgICAgICAgICAgY29uc29sZS5kZWJ1Zy5hcHBseShudWxsLCAuLi5tZXNzYWdlKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tICcuL3NldHRpbmdzJztcclxuaW1wb3J0IHsgVG9rZW5Ib3RiYXIgfSBmcm9tICcuL2hvdGJhci90b2tlbkhvdGJhcic7XHJcbmltcG9ydCB7IENPTlNUQU5UUyB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgSG90YmFyRmxhZ3NGYWN0b3J5LCBGbGFnU3RyYXRlZ3lGYWN0b3J5IH0gZnJvbSAnLi9mbGFncy9mYWN0b3J5JztcclxuaW1wb3J0IHsgVXNlckhvdGJhciB9IGZyb20gJy4vaG90YmFyL3VzZXJIb3RiYXInO1xyXG5pbXBvcnQgeyBQYWdlRmxhZyB9IGZyb20gJy4vZmxhZ3MvcGFnZUZsYWcnO1xyXG5pbXBvcnQgeyBDb25zb2xlTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xyXG5cclxuLy8gVE9ETzogUmVtb3ZlIGluIHYzLjAuMFxyXG5mdW5jdGlvbiBtaWdyYXRlRmxhZygpIHtcclxuICAgIGxldCBvbGREYXRhID0gZ2FtZS51c2VyLmdldEZsYWcoXCJ3b3JsZFwiLCBcInRva2VuLWhvdGJhclwiKTtcclxuICAgIGxldCBuZXdEYXRhID0gZ2FtZS51c2VyLmdldEZsYWcoXCJ3b3JsZFwiLCBDT05TVEFOVFMubW9kdWxlTmFtZSk7XHJcbiAgICBpZiAoIW9sZERhdGEgfHwgbmV3RGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJbVG9rZW4gSG90YmFyXVwiLCBcIk5vdGhpbmcgdG8gbWlncmF0ZS5cIiwgISFvbGREYXRhLCAhIW5ld0RhdGEpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmluZm8oXCJbVG9rZW4gSG90YmFyXVwiLCBcIk1pZ3JhdGluZyB0byBuZXcgZmxhZyBrZXkuXCIpO1xyXG5cclxuICAgIGdhbWUudXNlci5zZXRGbGFnKFwid29ybGRcIiwgQ09OU1RBTlRTLm1vZHVsZU5hbWUsIG9sZERhdGEpO1xyXG4gICAgZ2FtZS51c2VyLnVuc2V0RmxhZyhcIndvcmxkXCIsIFwidG9rZW4taG90YmFyXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb2tlbkhvdGJhcigpIHtcclxuICAgIGNvbnN0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKCkubG9hZChnYW1lLnNldHRpbmdzKTtcclxuICAgIGNvbnN0IGhvdGJhckZsYWdzID0gbmV3IEhvdGJhckZsYWdzRmFjdG9yeShzZXR0aW5ncyk7XHJcbiAgICBjb25zdCBrZXlTdHJhdGVneSA9IG5ldyBGbGFnU3RyYXRlZ3lGYWN0b3J5KHNldHRpbmdzLCBnYW1lLCBjYW52YXMpO1xyXG4gICAgcmV0dXJuIG5ldyBUb2tlbkhvdGJhcihcclxuICAgICAgICBob3RiYXJGbGFncy5jcmVhdGUoKSxcclxuICAgICAgICB1aS5ub3RpZmljYXRpb25zLFxyXG4gICAgICAgIHNldHRpbmdzLmhvdGJhclBhZ2UsXHJcbiAgICAgICAga2V5U3RyYXRlZ3kuY3JlYXRlRmxhZ0tleVN0cmF0ZWd5KCksXHJcbiAgICAgICAgbmV3IENvbnNvbGVMb2dnZXIoKDxhbnk+d2luZG93KS5Ub2tlbkhvdGJhci5kZWJ1ZykpO1xyXG59XHJcblxyXG5Ib29rcy5vbihcImluaXRcIiwgKCkgPT4ge1xyXG4gICAgQ29uc29sZUxvZ2dlci5pbml0KCk7XHJcblxyXG4gICAgZ2FtZS5zZXR0aW5ncy5yZWdpc3RlcihDT05TVEFOVFMubW9kdWxlTmFtZSwgU2V0dGluZ3Mua2V5cy5ob3RiYXJQYWdlLCB7XHJcbiAgICAgICAgbmFtZTogXCJQYWdlXCIsXHJcbiAgICAgICAgaGludDogXCJUaGUgaG90YmFyIHBhZ2UgdGhhdCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIHRva2VuIGhvdGJhci4gQ2hhbmdpbmcgdGhpcyB3aWxsIHdpcGUgZXhpc3RpbmcgdG9rZW4gYmFycyFcIixcclxuICAgICAgICBzY29wZTogXCJ3b3JsZFwiLFxyXG4gICAgICAgIGNvbmZpZzogdHJ1ZSxcclxuICAgICAgICBkZWZhdWx0OiA1LFxyXG4gICAgICAgIHR5cGU6IE51bWJlclxyXG4gICAgfSk7XHJcblxyXG4gICAgZ2FtZS5zZXR0aW5ncy5yZWdpc3RlcihDT05TVEFOVFMubW9kdWxlTmFtZSwgU2V0dGluZ3Mua2V5cy5saW5rVG9MaW5rZWRBY3Rvciwge1xyXG4gICAgICAgIG5hbWU6IFwiTGluayB0byBsaW5rZWQgYWN0b3JcIixcclxuICAgICAgICBoaW50OiBcIkxpbmsgdGhlIHRva2VuIGhvdGJhciB0byB0aGUgYWN0b3IgaWYgdGhlIHRva2VuIGlzIGxpbmtlZC5cIixcclxuICAgICAgICBzY29wZTogXCJ3b3JsZFwiLFxyXG4gICAgICAgIGNvbmZpZzogdHJ1ZSxcclxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxyXG4gICAgICAgIHR5cGU6IEJvb2xlYW5cclxuICAgIH0pO1xyXG5cclxuICAgIGdhbWUuc2V0dGluZ3MucmVnaXN0ZXIoQ09OU1RBTlRTLm1vZHVsZU5hbWUsIFNldHRpbmdzLmtleXMuYWx3YXlzTGlua1RvQWN0b3IsIHtcclxuICAgICAgICBuYW1lOiBcIkFsd2F5cyBsaW5rIHRvIGFjdG9yXCIsXHJcbiAgICAgICAgaGludDogXCJMaW5rIHRoZSB0b2tlbiBob3RiYXIgdG8gdGhlIGFjdG9yIGV2ZW4gaWYgdGhlIHRva2VuIGlzIHVubGlua2VkLlwiLFxyXG4gICAgICAgIHNjb3BlOiBcIndvcmxkXCIsXHJcbiAgICAgICAgY29uZmlnOiB0cnVlLFxyXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgIHR5cGU6IEJvb2xlYW5cclxuICAgIH0pO1xyXG5cclxuICAgIGdhbWUuc2V0dGluZ3MucmVnaXN0ZXIoQ09OU1RBTlRTLm1vZHVsZU5hbWUsIFNldHRpbmdzLmtleXMuc2hhcmVIb3RiYXIsIHtcclxuICAgICAgICBuYW1lOiBcIlNoYXJlIHRoZSBob3RiYXIgd2l0aCBvdGhlciBwbGF5ZXJzXCIsXHJcbiAgICAgICAgaGludDogXCJXaGVuIHNldCBldmVyeSB0b2tlbiB3aWxsIGhhdmUgYSBzaW5nbGUgaG90YmFyIHNoYXJlZCBieSBhbGwgcGxheWVycy5cIixcclxuICAgICAgICBzY29wZTogXCJ3b3JsZFwiLFxyXG4gICAgICAgIGNvbmZpZzogdHJ1ZSxcclxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICB0eXBlOiBCb29sZWFuXHJcbiAgICB9KTtcclxuXHJcbiAgICBnYW1lLnNldHRpbmdzLnJlZ2lzdGVyKENPTlNUQU5UUy5tb2R1bGVOYW1lLCBTZXR0aW5ncy5rZXlzLmxvY2tIb3RiYXIsIHtcclxuICAgICAgICBuYW1lOiBcIkxvY2sgc2hhcmVkIGhvdGJhclwiLFxyXG4gICAgICAgIGhpbnQ6IFwiV2hlbiBzZXQsIG9ubHkgYSBHTSBjYW4gdXBkYXRlIHRoZSB0b2tlbiBob3RiYXIuIE9ubHkgYXBwbGllcyB0byBzaGFyZWQgaG90YmFycy5cIixcclxuICAgICAgICBzY29wZTogXCJ3b3JsZFwiLFxyXG4gICAgICAgIGNvbmZpZzogdHJ1ZSxcclxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICB0eXBlOiBCb29sZWFuXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIltUb2tlbiBIb3RiYXJdXCIsIFwiSW5pdGlhbGl6ZWQgVG9rZW4gSG90YmFyXCIpO1xyXG4gICAgc2V0VGltZW91dChtaWdyYXRlRmxhZywgMjAwKTtcclxufSk7XHJcblxyXG5Ib29rcy5vbihcInJlbmRlckhvdGJhclwiLCAoZGF0YTogYW55KSA9PiB7XHJcbiAgICAvLyBjb25zdCBtYWNyb3MgPSBkYXRhLm1hY3JvcztcclxuICAgIC8vIEZJWE1FOiBkdWUgdG8gYSByYWNlIGNvbmRpdGlvbiwgc29tZXRpbWVzIHRoZSB3cm9uZyBtYWNyb3MgYXJlIHBhc3NlZC5cclxuICAgIC8vICAgICAgICBXZSBhcmUgb25seSBpbnRlcmVzdGVkIGluIHRoZSBvbmVzIG9uIHRoZSB0b2tlbiBob3RiYXIuXHJcbiAgICAvLyAgICAgICAgISBXaWxsIGJlIHVubmVjZXNzYXJ5IHRvIGZpeCBpbiB2My4wLjAgKHNlcGFyYXRlIGhvdGJhciwgYWxsIHBhZ2VzL3Nsb3RzIHdpbGwgYmUgcmVsZXZhbnQpXHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncygpLmxvYWQoZ2FtZS5zZXR0aW5ncyk7XHJcbiAgICBjb25zdCBtYWNyb3MgPSAoPGFueT51aSkuaG90YmFyLl9nZXRNYWNyb3NCeVBhZ2Uoc2V0dGluZ3MuaG90YmFyUGFnZSk7XHJcblxyXG4gICAgY29uc3QgdG9rZW4gPSBjYW52YXMudG9rZW5zLmNvbnRyb2xsZWRbMF07XHJcbiAgICBpZiAodG9rZW4gJiYgc2V0dGluZ3MuaG90YmFyUGFnZSA9PT0gKDxhbnk+dWkpLmhvdGJhci5wYWdlKVxyXG4gICAgICAgIGNyZWF0ZVRva2VuSG90YmFyKCkuc2F2ZSh0b2tlbiwgbWFjcm9zLCAhc2V0dGluZ3MubG9ja0hvdGJhciB8fCBnYW1lLnVzZXIuaXNHTSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufSk7XHJcblxyXG5Ib29rcy5vbihcImNvbnRyb2xUb2tlblwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGNhbnZhcy50b2tlbnMuY29udHJvbGxlZFswXTtcclxuXHJcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgQ29uc29sZUxvZ2dlcigpO1xyXG4gICAgY29uc3QgdWlIb3RiYXIgPSBuZXcgVXNlckhvdGJhcihuZXcgU2V0dGluZ3MoKS5sb2FkKGdhbWUuc2V0dGluZ3MpLCAoPGFueT51aSkuaG90YmFyLCBuZXcgUGFnZUZsYWcoKSwgbG9nZ2VyKTtcclxuICAgIGlmICh0b2tlbiAmJiBjYW52YXMudG9rZW5zLmNvbnRyb2xsZWQubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAvLyBob3RiYXIgZG9lcyBub3QgeWV0IGV4aXN0IG9uIGdhbWUudXNlci5kYXRhIGFuZCB1aSBkZWZpbml0aW9ucywgaGVuY2UgdGhlIGNhc3RzIHRvIGFueS5cclxuICAgICAgICBsb2dnZXIuZGVidWcoXCJbVG9rZW4gSG90YmFyXVwiLCBcImNvbnRyb2xsZWQgdG9rZW5cIiwgdG9rZW4pO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBjcmVhdGVUb2tlbkhvdGJhcigpXHJcbiAgICAgICAgICAgIC5sb2FkKHRva2VuLCBkdXBsaWNhdGUoKDxhbnk+Z2FtZS51c2VyLmRhdGEpLmhvdGJhciksIGdhbWUubWFjcm9zLmVudGl0aWVzKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAocmVzdWx0Lmhhc01hY3Jvcykge1xyXG4gICAgICAgICAgICBhd2FpdCBnYW1lLnVzZXIudXBkYXRlKHtob3RiYXI6IHJlc3VsdC5ob3RiYXJ9KTtcclxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKFwiW1Rva2VuIEhvdGJhcl1cIiwgXCJ1cGRhdGVkIGhvdGJhclwiLCB0b2tlbiwgcmVzdWx0LmhvdGJhcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVpSG90YmFyLmdvVG9QYWdlKHJlc3VsdC5oYXNNYWNyb3MpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdWlIb3RiYXIuZ29Ub1BhZ2UoZmFsc2UpO1xyXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhcIltUb2tlbiBIb3RiYXJdXCIsIFwiTm8gb3IgbXVsdGlwbGUgY29udHJvbGxlZCB0b2tlbnNcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufSk7XHJcblxyXG5Ib29rcy5vbihcInByZURlbGV0ZVRva2VuXCIsIChfOiBTY2VuZSwgdG9rZW46IGFueSkgPT4ge1xyXG4gICAgY3JlYXRlVG9rZW5Ib3RiYXIoKS5yZW1vdmUodG9rZW4uX2lkLCBnYW1lLmFjdG9ycywgY2FudmFzLnRva2Vucyk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufSk7XHJcblxyXG5Ib29rcy5vbihcInByZURlbGV0ZUFjdG9yXCIsIChhY3RvcjogYW55KSA9PiB7XHJcbiAgICBjcmVhdGVUb2tlbkhvdGJhcigpLnJlbW92ZShhY3Rvci5kYXRhLl9pZCwgZ2FtZS5hY3RvcnMsIGNhbnZhcy50b2tlbnMpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn0pO1xyXG5cclxuSG9va3Mub24oXCJyZWFkeVwiLCAoKSA9PiB7XHJcbiAgICBtaWdyYXRlRmxhZygpO1xyXG59KTsiLCJpbXBvcnQgeyBDT05TVEFOVFMgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENsaWVudFNldHRpbmdzUmVhZGVyIHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBnZXQoc2NvcGU6IHN0cmluZywga2V5OiBzdHJpbmcpOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XHJcbiAgICBhbHdheXNMaW5rVG9BY3RvcjogYm9vbGVhbjtcclxuICAgIGxpbmtUb0xpbmtlZEFjdG9yOiBib29sZWFuO1xyXG4gICAgaG90YmFyUGFnZTogbnVtYmVyO1xyXG4gICAgc2hhcmVIb3RiYXI6IGJvb2xlYW47XHJcbiAgICBsb2NrSG90YmFyOiBib29sZWFuO1xyXG5cclxuICAgIHN0YXRpYyBrZXlzID0ge1xyXG4gICAgICAgIGFsd2F5c0xpbmtUb0FjdG9yOiAnbGlua1RvQWN0b3InLFxyXG4gICAgICAgIGxpbmtUb0xpbmtlZEFjdG9yOiAnbGluaycsXHJcbiAgICAgICAgaG90YmFyUGFnZTogJ3BhZ2UnLFxyXG4gICAgICAgIHNoYXJlSG90YmFyOiAnc2hhcmUnLFxyXG4gICAgICAgIGxvY2tIb3RiYXI6ICdsb2NrJ1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkKHM6IENsaWVudFNldHRpbmdzUmVhZGVyKSA6IFNldHRpbmdzIHtcclxuICAgICAgICB0aGlzLmhvdGJhclBhZ2UgPSB0aGlzLmdldFNldHRpbmcocywgU2V0dGluZ3Mua2V5cy5ob3RiYXJQYWdlKTtcclxuXHJcbiAgICAgICAgdGhpcy5hbHdheXNMaW5rVG9BY3RvciA9IHRoaXMuZ2V0U2V0dGluZyhzLCBTZXR0aW5ncy5rZXlzLmFsd2F5c0xpbmtUb0FjdG9yKTtcclxuICAgICAgICB0aGlzLmxpbmtUb0xpbmtlZEFjdG9yID0gdGhpcy5nZXRTZXR0aW5nKHMsIFNldHRpbmdzLmtleXMubGlua1RvTGlua2VkQWN0b3IpIHx8IHRoaXMuYWx3YXlzTGlua1RvQWN0b3I7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcmVIb3RiYXIgPSB0aGlzLmdldFNldHRpbmcocywgU2V0dGluZ3Mua2V5cy5zaGFyZUhvdGJhcik7XHJcbiAgICAgICAgdGhpcy5sb2NrSG90YmFyID0gdGhpcy5nZXRTZXR0aW5nKHMsIFNldHRpbmdzLmtleXMubG9ja0hvdGJhcikgJiYgdGhpcy5zaGFyZUhvdGJhcjtcclxuICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U2V0dGluZyhzZXR0aW5nczogQ2xpZW50U2V0dGluZ3NSZWFkZXIsIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzLmdldChDT05TVEFOVFMubW9kdWxlTmFtZSwga2V5KTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=