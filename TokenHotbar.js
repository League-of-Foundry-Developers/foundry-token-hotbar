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
    moduleName: "TokenHotbar",
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
        return this.actors.get(entityId) || this.tokens.get(entityId);
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
    get(_) {
        return this.user;
    }
}
class IdentityFlagsStrategy extends FlagsStrategy {
    constructor(actors, tokens) {
        super(actors, tokens);
    }
    get(entityId) {
        return this.actors.get(entityId) || this.tokens.get(entityId);
    }
}
class LinkedFlagsStrategy extends FlagsStrategy {
    get(entityId) {
        const entity = this.getEntity(entityId);
        if (this.isToken(entity)) {
            return entity.data.actorLink ? entity.actor : entity;
        }
        return entity;
    }
}
class AlwaysLinkedFlagsStrategy extends FlagsStrategy {
    get(entityId) {
        const entity = this.getEntity(entityId);
        if (this.isToken(entity)) {
            return entity.actor;
        }
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
            .unsetFlag("world", _constants__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].moduleName)
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
        let page = localStorage.getItem(`${_constants__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].moduleName}.activePage`);
        if (page)
            return +page;
        return 1;
    }
    set(page) {
        return localStorage.setItem(`${_constants__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].moduleName}.activePage`, page + "");
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

class TokenHotbar {
    constructor(hotbarFlag, notifier, hotbarPage, flagKeyStrategy, logger = console) {
        this.hotbarFlag = hotbarFlag;
        this.notifier = notifier;
        this.hotbarPage = hotbarPage;
        this.flagKeyStrategy = flagKeyStrategy;
        this.logger = logger;
    }
    save(token, macrosToSave, canSave) {
        const slots = this.getSlots();
        macrosToSave = macrosToSave.filter(m => m.macro && slots.includes(m.slot));
        const flagKey = this.flagKeyStrategy.get(token.id);
        const tokenHotbars = this.hotbarFlag.get(token.id);
        let tokenHotbar = tokenHotbars[flagKey.id] || [];
        if (!this.hasChanges(macrosToSave, tokenHotbar))
            return false;
        if (!canSave) {
            this.notifier.warn("The token hotbar is locked for players. Any macros placed on this page will be replaced.");
            return false;
        }
        this.logger.debug("[Token Hotbar]", "preSave", flagKey, tokenHotbars);
        tokenHotbars[flagKey.id] =
            macrosToSave
                .map(item => {
                return {
                    slot: item.slot,
                    id: item.macro.id
                };
            });
        this.logger.debug("[Token Hotbar]", "Saving", flagKey, tokenHotbars);
        this.hotbarFlag.set(token.id, tokenHotbars);
        return true;
    }
    load(token, userHotbar, gameMacros) {
        const tokenHotbars = this.hotbarFlag.get(token.id);
        const flagKey = this.flagKeyStrategy.get(token.id);
        const tokenHotbar = tokenHotbars[flagKey.id] || [];
        if (tokenHotbar.length === 0)
            return { hasMacros: false, hotbar: userHotbar };
        this.logger.debug("[Token Hotbar]", "Loading", flagKey, tokenHotbar);
        let hasValidMacros = false;
        for (let slot of this.getSlots()) {
            let slotMacro = tokenHotbar.find(m => m.slot == slot);
            const tokenHotbarSlotIsEmpty = !slotMacro;
            if (tokenHotbarSlotIsEmpty) {
                this.unset(userHotbar, slot);
            }
            else {
                let tokenMacro = gameMacros.find(m => m.id === slotMacro.id);
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
        this.logger.debug("[Token Hotbar]", "Comparing", barMacros, tokenMacros);
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
            return;
        return this.render(this.pageFlag.get());
    }
    render(page) {
        this.hotbar.page = page;
        return new Promise((resolve, _) => {
            setTimeout(() => {
                this.hotbar.render();
                this.logger.debug("[Token Hotbar]", "rendered page", page);
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
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
class Logger {
    error(...message) {
        console.error.apply(null, arguments);
    }
    warn(...message) {
        console.warn.apply(null, arguments);
    }
    info(...message) {
        console.info.apply(null, arguments);
    }
    debug(...message) {
        var _a;
        if ((_a = window.TokenHotbar) === null || _a === void 0 ? void 0 : _a.debug)
            console.debug.apply(null, arguments);
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
    return new _hotbar_tokenHotbar__WEBPACK_IMPORTED_MODULE_1__["TokenHotbar"](hotbarFlags.create(), ui.notifications, settings.hotbarPage, keyStrategy.createFlagKeyStrategy(), new _logger__WEBPACK_IMPORTED_MODULE_6__["Logger"]());
}
Hooks.on("init", () => {
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
    console.log("initialized Token Hotbar");
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
    const logger = new _logger__WEBPACK_IMPORTED_MODULE_6__["Logger"]();
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
    constructor() { }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZmxhZ3MvZmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZmxhZ3MvZmxhZ1N0cmF0ZWdpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsYWdzL2hvdGJhckZsYWdzLnRzIiwid2VicGFjazovLy8uL3NyYy9mbGFncy9wYWdlRmxhZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaG90YmFyL3Rva2VuSG90YmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9ob3RiYXIvdXNlckhvdGJhci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBTyxNQUFNLFNBQVMsR0FBRztJQUNyQixVQUFVLEVBQUUsYUFBYTtDQUM1Qjs7Ozs7Ozs7Ozs7OztBQ0REO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBbUQ7QUFDeUU7QUFFckgsTUFBTSxrQkFBa0I7SUFDM0IsWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFJLENBQUM7SUFFcEMsTUFBTTtRQUNULE1BQU0sT0FBTyxHQUFHLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckUsT0FBTyxJQUFJLCtEQUFrQixDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUNKO0FBVU0sTUFBTSxtQkFBbUI7SUFFNUIsWUFBb0IsUUFBa0IsRUFBVSxJQUFTLEVBQVUsTUFBVztRQUExRCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBSztRQUFVLFdBQU0sR0FBTixNQUFNLENBQUs7SUFBSSxDQUFDO0lBRTVFLGtCQUFrQjtRQUNyQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDakMsT0FBTyxJQUFJLHlFQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDOUU7WUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ2pDLE9BQU8sSUFBSSxtRUFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3hFO1lBQ0QsT0FBTyxJQUFJLHFFQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDMUU7UUFDRCxPQUFPLElBQUksaUVBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRU0scUJBQXFCO1FBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUI7WUFDL0IsT0FBTyxJQUFJLHlFQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0UsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQjtZQUMvQixPQUFPLElBQUksbUVBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV6RSxPQUFPLElBQUkscUVBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUM3Q0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU8sTUFBZSxhQUFhO0lBRS9CLFlBQXNCLE1BQTJCLEVBQVksTUFBMkI7UUFBbEUsV0FBTSxHQUFOLE1BQU0sQ0FBcUI7UUFBWSxXQUFNLEdBQU4sTUFBTSxDQUFxQjtJQUFJLENBQUM7SUFNbkYsU0FBUyxDQUFDLFFBQWdCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFFLENBQUM7SUFDbkUsQ0FBQztJQUVTLE9BQU8sQ0FBQyxNQUFXO1FBQ3pCLE9BQU8sT0FBTyxJQUFJLE1BQU0sQ0FBQztJQUM3QixDQUFDO0NBQ0o7QUFFTSxNQUFNLGlCQUFrQixTQUFRLGFBQWE7SUFDaEQsWUFBb0IsSUFBZSxFQUFFLE1BQTJCLEVBQUUsTUFBMkI7UUFDekYsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUROLFNBQUksR0FBSixJQUFJLENBQVc7SUFFbkMsQ0FBQztJQUVELEdBQUcsQ0FBQyxDQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FDSjtBQUVNLE1BQU0scUJBQXNCLFNBQVEsYUFBYTtJQUNwRCxZQUFZLE1BQTJCLEVBQUUsTUFBMkI7UUFDaEUsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsR0FBRyxDQUFDLFFBQWdCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFFLENBQUM7SUFDbkUsQ0FBQztDQUNKO0FBRU0sTUFBTSxtQkFBb0IsU0FBUSxhQUFhO0lBQ2xELEdBQUcsQ0FBQyxRQUFnQjtRQUNoQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN0QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDekQ7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0o7QUFFTSxNQUFNLHlCQUEwQixTQUFRLGFBQWE7SUFDeEQsR0FBRyxDQUFDLFFBQWdCO1FBQ2hCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sTUFBTSxDQUFDLEtBQU0sQ0FBQztTQUN4QjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQzNERDtBQUFBO0FBQUE7QUFBeUM7QUFzQmxDLE1BQU0sa0JBQWtCO0lBQzNCLFlBQW9CLGVBQThCO1FBQTlCLG9CQUFlLEdBQWYsZUFBZSxDQUFlO0lBQUksQ0FBQztJQUV2RCxHQUFHLENBQUMsT0FBZTtRQUNmLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLG9EQUFTLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xFLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxHQUFHLENBQUMsT0FBZSxFQUFFLElBQWdCO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO2FBQ25DLFNBQVMsQ0FBQyxPQUFPLEVBQUUsb0RBQVMsQ0FBQyxVQUFVLENBQUM7YUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ1gsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxvREFBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQzVEO1FBQUEsQ0FBQyxDQUFDLENBQUM7SUFDWixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUN0Q0Q7QUFBQTtBQUFBO0FBQXlDO0FBRWxDLE1BQU0sUUFBUTtJQUNWLEdBQUc7UUFDTixJQUFJLElBQUksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsb0RBQVMsQ0FBQyxVQUFVLGFBQWEsQ0FBQyxDQUFDO1FBQ3RFLElBQUksSUFBSTtZQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDdkIsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRU0sR0FBRyxDQUFDLElBQVk7UUFDbkIsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsb0RBQVMsQ0FBQyxVQUFVLGFBQWEsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDakYsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDVEQ7QUFBQTtBQUFBO0FBQStFO0FBRXhFLE1BQU0sV0FBVztJQUdwQixZQUNZLFVBQXVCLEVBQ3ZCLFFBQWtCLEVBQ2xCLFVBQWtCLEVBQ2xCLGVBQThCLEVBQzlCLFNBQWlCLE9BQU87UUFKeEIsZUFBVSxHQUFWLFVBQVUsQ0FBYTtRQUN2QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQWU7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBSSxDQUFDO0lBRWxDLElBQUksQ0FBQyxLQUFtQixFQUFFLFlBQXFCLEVBQUUsT0FBZ0I7UUFDcEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVuRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkQsSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFLakQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzlELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQywwRkFBMEYsQ0FBQztZQUM5RyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFdEUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDbkIsWUFBWTtpQkFDWixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ1IsT0FBTztvQkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtpQkFDcEI7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBSU0sSUFBSSxDQUFDLEtBQWEsRUFBRSxVQUFrQixFQUFFLFVBQTBCO1FBQ3JFLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkQsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFbkQsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUM7WUFDeEIsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDO1FBRXBELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFckUsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzNCLEtBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzdCLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO1lBQ3RELE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDMUMsSUFBSSxzQkFBc0IsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDaEM7aUJBQ0k7Z0JBQ0QsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssU0FBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5RCxJQUFJLFVBQVUsRUFBRTtvQkFDWixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQztvQkFDakMsY0FBYyxHQUFHLElBQUksQ0FBQztpQkFDekI7cUJBQ0k7b0JBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ2hDO2FBQ0o7U0FDSjtRQUVELE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUM3RCxDQUFDO0lBRU0sTUFBTSxDQUFDLE9BQWUsRUFBRSxNQUEyQixFQUFFLE1BQTJCO1FBR25GLE1BQU0sT0FBTyxHQUFHLElBQUksMkVBQXFCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVPLFFBQVE7UUFDWixTQUFTLEtBQUssQ0FBQyxJQUFZLEVBQUUsT0FBTyxHQUFHLENBQUM7WUFDcEMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFFRCxPQUFPLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU8sS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFZO1FBQ2xDLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFTyxVQUFVLENBQUMsU0FBUyxFQUFFLFdBQVc7UUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUV6RSxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFDLE1BQU07WUFBRSxPQUFPLElBQUksQ0FBQztRQUV4RCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQ3hDLE9BQU8sSUFBSSxDQUFDO1lBRWhCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzNDLE9BQU8sSUFBSSxDQUFDO1NBQ25CO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDL0dEO0FBQUE7QUFBTyxNQUFNLFVBQVU7SUFDbkIsWUFBb0IsUUFBa0IsRUFBVSxNQUFxQixFQUFVLFFBQWtCLEVBQVUsU0FBaUIsT0FBTztRQUEvRyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUFJLENBQUM7SUFFakksUUFBUSxDQUFDLGdCQUF5QjtRQUNyQyxJQUFJLGdCQUFnQixFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ2pDO2FBQ0k7WUFDRCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQztJQUVNLGVBQWU7UUFDbEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVU7WUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sa0JBQWtCO1FBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVO1lBQzVDLE9BQU87UUFFWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTyxNQUFNLENBQUMsSUFBWTtRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDeEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUU5QixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0QsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDVixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FFSjs7Ozs7Ozs7Ozs7OztBQy9DRDtBQUFBO0FBQU8sTUFBTSxNQUFNO0lBQ2YsS0FBSyxDQUFDLEdBQUcsT0FBYztRQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELElBQUksQ0FBQyxHQUFHLE9BQWM7UUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJLENBQUMsR0FBRyxPQUFjO1FBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUcsT0FBYzs7UUFDbkIsVUFBVSxNQUFPLENBQUMsV0FBVywwQ0FBRSxLQUFLO1lBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCcUM7QUFDYTtBQUNYO0FBQ2tDO0FBQ3pCO0FBQ0w7QUFDVjtBQUdsQyxTQUFTLFdBQVc7SUFDaEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3pELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxvREFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9ELElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxFQUFFO1FBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0UsT0FBTztLQUNWO0lBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO0lBRTdELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxvREFBUyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELFNBQVMsaUJBQWlCO0lBQ3RCLE1BQU0sUUFBUSxHQUFHLElBQUksa0RBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxpRUFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRCxNQUFNLFdBQVcsR0FBRyxJQUFJLGtFQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEUsT0FBTyxJQUFJLCtEQUFXLENBQ2xCLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFDcEIsRUFBRSxDQUFDLGFBQWEsRUFDaEIsUUFBUSxDQUFDLFVBQVUsRUFDbkIsV0FBVyxDQUFDLHFCQUFxQixFQUFFLEVBQ25DLElBQUksOENBQU0sRUFBRSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUVELEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxvREFBUyxDQUFDLFVBQVUsRUFBRSxrREFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDbkUsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsMkdBQTJHO1FBQ2pILEtBQUssRUFBRSxPQUFPO1FBQ2QsTUFBTSxFQUFFLElBQUk7UUFDWixPQUFPLEVBQUUsQ0FBQztRQUNWLElBQUksRUFBRSxNQUFNO0tBQ2YsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsb0RBQVMsQ0FBQyxVQUFVLEVBQUUsa0RBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7UUFDMUUsSUFBSSxFQUFFLHNCQUFzQjtRQUM1QixJQUFJLEVBQUUsNERBQTREO1FBQ2xFLEtBQUssRUFBRSxPQUFPO1FBQ2QsTUFBTSxFQUFFLElBQUk7UUFDWixPQUFPLEVBQUUsSUFBSTtRQUNiLElBQUksRUFBRSxPQUFPO0tBQ2hCLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLG9EQUFTLENBQUMsVUFBVSxFQUFFLGtEQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1FBQzFFLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsSUFBSSxFQUFFLG1FQUFtRTtRQUN6RSxLQUFLLEVBQUUsT0FBTztRQUNkLE1BQU0sRUFBRSxJQUFJO1FBQ1osT0FBTyxFQUFFLEtBQUs7UUFDZCxJQUFJLEVBQUUsT0FBTztLQUNoQixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxvREFBUyxDQUFDLFVBQVUsRUFBRSxrREFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDcEUsSUFBSSxFQUFFLHFDQUFxQztRQUMzQyxJQUFJLEVBQUUsdUVBQXVFO1FBQzdFLEtBQUssRUFBRSxPQUFPO1FBQ2QsTUFBTSxFQUFFLElBQUk7UUFDWixPQUFPLEVBQUUsS0FBSztRQUNkLElBQUksRUFBRSxPQUFPO0tBQ2hCLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLG9EQUFTLENBQUMsVUFBVSxFQUFFLGtEQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNuRSxJQUFJLEVBQUUsb0JBQW9CO1FBQzFCLElBQUksRUFBRSxrRkFBa0Y7UUFDeEYsS0FBSyxFQUFFLE9BQU87UUFDZCxNQUFNLEVBQUUsSUFBSTtRQUNaLE9BQU8sRUFBRSxLQUFLO1FBQ2QsSUFBSSxFQUFFLE9BQU87S0FDaEIsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3hDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDLENBQUM7QUFFSCxLQUFLLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQVMsRUFBRSxFQUFFO0lBS25DLE1BQU0sUUFBUSxHQUFHLElBQUksa0RBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEQsTUFBTSxNQUFNLEdBQVMsRUFBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFdEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsSUFBSSxLQUFLLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBVyxFQUFHLENBQUMsTUFBTSxDQUFDLElBQUk7UUFDdEQsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLEdBQVMsRUFBRTtJQUNoQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUxQyxNQUFNLE1BQU0sR0FBRyxJQUFJLDhDQUFNLEVBQUUsQ0FBQztJQUM1QixNQUFNLFFBQVEsR0FBRyxJQUFJLDZEQUFVLENBQUMsSUFBSSxrREFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBUSxFQUFHLENBQUMsTUFBTSxFQUFFLElBQUksd0RBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlHLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7UUFFL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxRCxJQUFJLE1BQU0sR0FBRyxpQkFBaUIsRUFBRTthQUMzQixJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWhGLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUNsQixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMxRTtRQUNELFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3ZDO1NBQ0k7UUFDRCxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztLQUN0RTtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMsRUFBQyxDQUFDO0FBRUgsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQVEsRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNoRCxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xFLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyxDQUFDO0FBRUgsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO0lBQ3RDLGlCQUFpQixFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZFLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyxDQUFDO0FBRUgsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBQ25CLFdBQVcsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7O0FDdklIO0FBQUE7QUFBQTtBQUF3QztBQU1qQyxNQUFNLFFBQVE7SUFlakIsZ0JBQWdCLENBQUM7SUFFVixJQUFJLENBQUMsQ0FBdUI7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRS9ELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFFdkcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRW5GLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyxVQUFVLENBQUMsUUFBOEIsRUFBRSxHQUFXO1FBQzFELE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxvREFBUyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUM7SUFDbEQsQ0FBQzs7QUF4Qk0sYUFBSSxHQUFHO0lBQ1YsaUJBQWlCLEVBQUUsYUFBYTtJQUNoQyxpQkFBaUIsRUFBRSxNQUFNO0lBQ3pCLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLFVBQVUsRUFBRSxNQUFNO0NBQ3JCIiwiZmlsZSI6IlRva2VuSG90YmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsImV4cG9ydCBjb25zdCBDT05TVEFOVFMgPSB7XHJcbiAgICBtb2R1bGVOYW1lOiBcIlRva2VuSG90YmFyXCIsXHJcbn0iLCJpbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzJztcclxuaW1wb3J0IHsgRm91bmRyeUhvdGJhckZsYWdzIH0gZnJvbSAnLi9ob3RiYXJGbGFncyc7XHJcbmltcG9ydCB7IElkZW50aXR5RmxhZ3NTdHJhdGVneSwgVXNlckZsYWdzU3RyYXRlZ3ksIExpbmtlZEZsYWdzU3RyYXRlZ3ksIEFsd2F5c0xpbmtlZEZsYWdzU3RyYXRlZ3kgfSBmcm9tICcuL2ZsYWdTdHJhdGVnaWVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBIb3RiYXJGbGFnc0ZhY3Rvcnkge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXR0aW5nczogU2V0dGluZ3MpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGUoKSB7XHJcbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IG5ldyBGbGFnU3RyYXRlZ3lGYWN0b3J5KHRoaXMuc2V0dGluZ3MsIGdhbWUsIGNhbnZhcyk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBGb3VuZHJ5SG90YmFyRmxhZ3MoZmFjdG9yeS5jcmVhdGVGbGFnU3RyYXRlZ3koKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIENvbmZpZ3VyYXRpb24gY29tYmluYXRpb25zXHJcbi8vIHNoYXJlZCB8ICBsaW5rIHwgYWx3YXlzIHwgIGVudGl0eSAgIHwga2V5XHJcbi8vICAgIDEgICB8ICAgMCAgIHwgICAgMCAgIHwgIGlkZW50aXR5IHwgaWRlbnRpdHlcclxuLy8gICAgMSAgIHwgICAxICAgfCAgICAwICAgfCAgbGluayAgICAgfCBsaW5rXHJcbi8vICAgIDEgICB8ICAgLSAgIHwgICAgMSAgIHwgIGFjdG9yICAgIHwgYWN0b3JcclxuLy8gICAgMCAgIHwgICAwICAgfCAgICAwICAgfCAgdXNlciAgICAgfCBpZGVudGl0eVxyXG4vLyAgICAwICAgfCAgIDEgICB8ICAgIDAgICB8ICB1c2VyICAgICB8IGxpbmtcclxuLy8gICAgMCAgIHwgICAtICAgfCAgICAxICAgfCAgdXNlciAgICAgfCBhY3RvclxyXG5leHBvcnQgY2xhc3MgRmxhZ1N0cmF0ZWd5RmFjdG9yeSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXR0aW5nczogU2V0dGluZ3MsIHByaXZhdGUgZ2FtZTogYW55LCBwcml2YXRlIGNhbnZhczogYW55KSB7IH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlRmxhZ1N0cmF0ZWd5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNoYXJlSG90YmFyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFsd2F5c0xpbmtUb0FjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFsd2F5c0xpbmtlZEZsYWdzU3RyYXRlZ3kodGhpcy5nYW1lLmFjdG9ycywgdGhpcy5jYW52YXMudG9rZW5zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5saW5rVG9MaW5rZWRBY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBMaW5rZWRGbGFnc1N0cmF0ZWd5KHRoaXMuZ2FtZS5hY3RvcnMsIHRoaXMuY2FudmFzLnRva2Vucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJZGVudGl0eUZsYWdzU3RyYXRlZ3kodGhpcy5nYW1lLmFjdG9ycywgdGhpcy5jYW52YXMudG9rZW5zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVc2VyRmxhZ3NTdHJhdGVneSh0aGlzLmdhbWUudXNlciwgdGhpcy5nYW1lLmFjdG9ycywgdGhpcy5jYW52YXMudG9rZW5zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlRmxhZ0tleVN0cmF0ZWd5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFsd2F5c0xpbmtUb0FjdG9yKVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFsd2F5c0xpbmtlZEZsYWdzU3RyYXRlZ3kodGhpcy5nYW1lLmFjdG9ycywgdGhpcy5jYW52YXMudG9rZW5zKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubGlua1RvTGlua2VkQWN0b3IpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGlua2VkRmxhZ3NTdHJhdGVneSh0aGlzLmdhbWUuYWN0b3JzLCB0aGlzLmNhbnZhcy50b2tlbnMpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IElkZW50aXR5RmxhZ3NTdHJhdGVneSh0aGlzLmdhbWUuYWN0b3JzLCB0aGlzLmNhbnZhcy50b2tlbnMpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEZsYWdnYWJsZSwgSUFjdG9yLCBJVG9rZW4gfSBmcm9tIFwiLi4vZm91bmRyeVwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZsYWdzU3RyYXRlZ3kge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhY3RvcnM6IE1hcDxzdHJpbmcsIElBY3Rvcj4sIHByb3RlY3RlZCB0b2tlbnM6IE1hcDxzdHJpbmcsIElUb2tlbj4pIHsgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gZW50aXR5SWQgVGhlIGlkIG9mIHRoZSBhY3RvciBvciB0b2tlblxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBnZXQoZW50aXR5SWQ6IHN0cmluZyk6IEZsYWdnYWJsZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0RW50aXR5KGVudGl0eUlkOiBzdHJpbmcpIDogSUFjdG9yIHwgSVRva2VuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3RvcnMuZ2V0KGVudGl0eUlkKSB8fCB0aGlzLnRva2Vucy5nZXQoZW50aXR5SWQpITtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaXNUb2tlbihlbnRpdHk6IGFueSk6IGVudGl0eSBpcyBJVG9rZW4ge1xyXG4gICAgICAgIHJldHVybiAnYWN0b3InIGluIGVudGl0eTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJGbGFnc1N0cmF0ZWd5IGV4dGVuZHMgRmxhZ3NTdHJhdGVneSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVzZXI6IEZsYWdnYWJsZSwgYWN0b3JzOiBNYXA8c3RyaW5nLCBJQWN0b3I+LCB0b2tlbnM6IE1hcDxzdHJpbmcsIElUb2tlbj4pIHsgXHJcbiAgICAgICAgc3VwZXIoYWN0b3JzLCB0b2tlbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldChfOiBzdHJpbmcpOiBGbGFnZ2FibGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJZGVudGl0eUZsYWdzU3RyYXRlZ3kgZXh0ZW5kcyBGbGFnc1N0cmF0ZWd5IHtcclxuICAgIGNvbnN0cnVjdG9yKGFjdG9yczogTWFwPHN0cmluZywgSUFjdG9yPiwgdG9rZW5zOiBNYXA8c3RyaW5nLCBJVG9rZW4+KSB7IFxyXG4gICAgICAgIHN1cGVyKGFjdG9ycywgdG9rZW5zKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQoZW50aXR5SWQ6IHN0cmluZyk6IEZsYWdnYWJsZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0b3JzLmdldChlbnRpdHlJZCkgfHwgdGhpcy50b2tlbnMuZ2V0KGVudGl0eUlkKSE7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5rZWRGbGFnc1N0cmF0ZWd5IGV4dGVuZHMgRmxhZ3NTdHJhdGVneSB7XHJcbiAgICBnZXQoZW50aXR5SWQ6IHN0cmluZyk6IEZsYWdnYWJsZSB7XHJcbiAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5nZXRFbnRpdHkoZW50aXR5SWQpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzVG9rZW4oZW50aXR5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZW50aXR5LmRhdGEuYWN0b3JMaW5rID8gZW50aXR5LmFjdG9yISA6IGVudGl0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbnRpdHk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBbHdheXNMaW5rZWRGbGFnc1N0cmF0ZWd5IGV4dGVuZHMgRmxhZ3NTdHJhdGVneSB7XHJcbiAgICBnZXQoZW50aXR5SWQ6IHN0cmluZyk6IEZsYWdnYWJsZSB7XHJcbiAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5nZXRFbnRpdHkoZW50aXR5SWQpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzVG9rZW4oZW50aXR5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZW50aXR5LmFjdG9yITtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbnRpdHk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDT05TVEFOVFMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBGbGFnZ2FibGUgfSBmcm9tICcuLi9mb3VuZHJ5JztcclxuaW1wb3J0IHsgRmxhZ3NTdHJhdGVneSB9IGZyb20gJy4vZmxhZ1N0cmF0ZWdpZXMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIb3RiYXJJdGVtIHtcclxuICAgIGlkOiBzdHJpbmcsXHJcbiAgICBzbG90OiBOdW1iZXJcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgSG90YmFyRGF0YSA9IHsgW3Rva2VuSWQ6IHN0cmluZ106IEhvdGJhckl0ZW1bXSB9O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIb3RiYXJGbGFncyB7IFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGhvdGJhciBmb3IgYSBwYXJ0aWN1bGFyIGVudGl0eS5cclxuICAgICAqIFBPU1Q6IFJldHVybiB2YWx1ZSBpcyBhbHdheXMgYW4gb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIGVudGl0eSB0aGUgdG9rZW4gb3IgYWN0b3IgdG8gZ2V0IHRoZSBob3RiYXIgZm9yLlxyXG4gICAgICovXHJcbiAgICBnZXQodG9rZW5JZDogc3RyaW5nKTogSG90YmFyRGF0YTtcclxuXHJcbiAgICBzZXQodG9rZW5JZDogc3RyaW5nLCBkYXRhOiBIb3RiYXJEYXRhKTogUHJvbWlzZTxGbGFnZ2FibGU+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRm91bmRyeUhvdGJhckZsYWdzIGltcGxlbWVudHMgSG90YmFyRmxhZ3Mge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBnZXRGbGFnU3RyYXRlZ3k6IEZsYWdzU3RyYXRlZ3kpIHsgfVxyXG5cclxuICAgIGdldCh0b2tlbklkOiBzdHJpbmcpOiBIb3RiYXJEYXRhIHtcclxuICAgICAgICBjb25zdCBmbGFncyA9IHRoaXMuZ2V0RmxhZ1N0cmF0ZWd5LmdldCh0b2tlbklkKTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBmbGFncy5nZXRGbGFnKCd3b3JsZCcsIENPTlNUQU5UUy5tb2R1bGVOYW1lKSB8fCB7fTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCh0b2tlbklkOiBzdHJpbmcsIGRhdGE6IEhvdGJhckRhdGEpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGbGFnU3RyYXRlZ3kuZ2V0KHRva2VuSWQpXHJcbiAgICAgICAgICAgIC51bnNldEZsYWcoXCJ3b3JsZFwiLCBDT05TVEFOVFMubW9kdWxlTmFtZSlcclxuICAgICAgICAgICAgLnRoZW4oZW50aXR5ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHkuc2V0RmxhZygnd29ybGQnLCBDT05TVEFOVFMubW9kdWxlTmFtZSwgZGF0YVxyXG4gICAgICAgICAgICApfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ09OU1RBTlRTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhZ2VGbGFnIHtcclxuICAgIHB1YmxpYyBnZXQoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgcGFnZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke0NPTlNUQU5UUy5tb2R1bGVOYW1lfS5hY3RpdmVQYWdlYCk7XHJcbiAgICAgICAgaWYgKHBhZ2UpIHJldHVybiArcGFnZTtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0KHBhZ2U6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHtDT05TVEFOVFMubW9kdWxlTmFtZX0uYWN0aXZlUGFnZWAsIHBhZ2UgKyBcIlwiKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEhvdGJhckZsYWdzLCB9IGZyb20gXCIuLi9mbGFncy9ob3RiYXJGbGFnc1wiO1xyXG5pbXBvcnQgeyBOb3RpZmllciwgSWRlbnRpZmlhYmxlLCBNYWNybywgSVRva2VuLCBJQWN0b3IgfSBmcm9tIFwiLi4vZm91bmRyeVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vbG9nZ2VyXCI7XHJcbmltcG9ydCB7IEZsYWdzU3RyYXRlZ3ksIElkZW50aXR5RmxhZ3NTdHJhdGVneSB9IGZyb20gXCIuLi9mbGFncy9mbGFnU3RyYXRlZ2llc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRva2VuSG90YmFyIHsgXHJcbiAgICAvLyBEZXYgbm90ZTogbm90IGZvbmQgb2YgdGhpcyBtYW55IHBhcmFtZXRlcnMuIFxyXG4gICAgLy8gSG93ZXZlciwgZnJvbSB2MyAoc2VwYXJhdGUgaG90YmFyKSBvbiBhdCBsZWFzdCB0d28gd2lsbCBiZSBvYnNvbGV0ZSAocGFnZXMpXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGhvdGJhckZsYWc6IEhvdGJhckZsYWdzLFxyXG4gICAgICAgIHByaXZhdGUgbm90aWZpZXI6IE5vdGlmaWVyLFxyXG4gICAgICAgIHByaXZhdGUgaG90YmFyUGFnZTogbnVtYmVyLFxyXG4gICAgICAgIHByaXZhdGUgZmxhZ0tleVN0cmF0ZWd5OiBGbGFnc1N0cmF0ZWd5LFxyXG4gICAgICAgIHByaXZhdGUgbG9nZ2VyOiBMb2dnZXIgPSBjb25zb2xlKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgc2F2ZSh0b2tlbjogSWRlbnRpZmlhYmxlLCBtYWNyb3NUb1NhdmU6IE1hY3JvW10sIGNhblNhdmU6IGJvb2xlYW4pIHtcclxuICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuZ2V0U2xvdHMoKTtcclxuICAgICAgICBtYWNyb3NUb1NhdmUgPSBtYWNyb3NUb1NhdmUuZmlsdGVyKG0gPT4gbS5tYWNybyAmJiBzbG90cy5pbmNsdWRlcyhtLnNsb3QpKTtcclxuICAgICAgICBjb25zdCBmbGFnS2V5ID0gdGhpcy5mbGFnS2V5U3RyYXRlZ3kuZ2V0KHRva2VuLmlkKTtcclxuXHJcbiAgICAgICAgY29uc3QgdG9rZW5Ib3RiYXJzID0gdGhpcy5ob3RiYXJGbGFnLmdldCh0b2tlbi5pZCk7XHJcbiAgICAgICAgbGV0IHRva2VuSG90YmFyID0gdG9rZW5Ib3RiYXJzW2ZsYWdLZXkuaWRdIHx8IFtdO1xyXG5cclxuICAgICAgICAvLyBGSVhNRTogdGhpcyBzZWVtcyB2ZXJ5IGluZWZmaWNpZW50XHJcbiAgICAgICAgLy8gICAgICAgIHdpbGwgYmVjb21lIHVubmVjZXNzYXJ5IGluIHYzLjAuMFxyXG4gICAgICAgIC8vICAgICAgICAhIFdpbGwgYmUgdW5uZWNlc3NhcnkgdG8gZml4IGluIHYzLjAuMCAoc2VwYXJhdGUgaG90YmFyLCBhbGwgcGFnZXMvc2xvdHMgd2lsbCBiZSByZWxldmFudClcclxuICAgICAgICBpZiAoIXRoaXMuaGFzQ2hhbmdlcyhtYWNyb3NUb1NhdmUsIHRva2VuSG90YmFyKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICghY2FuU2F2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vdGlmaWVyLndhcm4oXCJUaGUgdG9rZW4gaG90YmFyIGlzIGxvY2tlZCBmb3IgcGxheWVycy4gQW55IG1hY3JvcyBwbGFjZWQgb24gdGhpcyBwYWdlIHdpbGwgYmUgcmVwbGFjZWQuXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiW1Rva2VuIEhvdGJhcl1cIiwgXCJwcmVTYXZlXCIsIGZsYWdLZXksIHRva2VuSG90YmFycyk7XHJcblxyXG4gICAgICAgIHRva2VuSG90YmFyc1tmbGFnS2V5LmlkXSA9XHJcbiAgICAgICAgICAgICBtYWNyb3NUb1NhdmVcclxuICAgICAgICAgICAgLm1hcChpdGVtID0+IHsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsb3Q6IGl0ZW0uc2xvdCxcclxuICAgICAgICAgICAgICAgICAgICBpZDogaXRlbS5tYWNyby5pZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJbVG9rZW4gSG90YmFyXVwiLCBcIlNhdmluZ1wiLCBmbGFnS2V5LCB0b2tlbkhvdGJhcnMpO1xyXG5cclxuICAgICAgICB0aGlzLmhvdGJhckZsYWcuc2V0KHRva2VuLmlkLCB0b2tlbkhvdGJhcnMpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgdGhlIHRva2VuIGhhcyBtYWNyb3Mgb24gdGhlIHRva2VuIGhvdGJhclxyXG4gICAgLy8gICAgICAgICBvdGhlcndpc2UgZmFsc2VcclxuICAgIHB1YmxpYyBsb2FkKHRva2VuOiBJVG9rZW4sIHVzZXJIb3RiYXI6IG9iamVjdCwgZ2FtZU1hY3JvczogSWRlbnRpZmlhYmxlW10pIHtcclxuICAgICAgICBjb25zdCB0b2tlbkhvdGJhcnMgPSB0aGlzLmhvdGJhckZsYWcuZ2V0KHRva2VuLmlkKTtcclxuICAgICAgICBjb25zdCBmbGFnS2V5ID0gdGhpcy5mbGFnS2V5U3RyYXRlZ3kuZ2V0KHRva2VuLmlkKTtcclxuICAgICAgICBjb25zdCB0b2tlbkhvdGJhciA9IHRva2VuSG90YmFyc1tmbGFnS2V5LmlkXSB8fCBbXTtcclxuXHJcbiAgICAgICAgaWYgKHRva2VuSG90YmFyLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHsgaGFzTWFjcm9zOiBmYWxzZSwgaG90YmFyOiB1c2VySG90YmFyIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJbVG9rZW4gSG90YmFyXVwiLCBcIkxvYWRpbmdcIiwgZmxhZ0tleSwgdG9rZW5Ib3RiYXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBoYXNWYWxpZE1hY3JvcyA9IGZhbHNlO1xyXG4gICAgICAgIGZvcihsZXQgc2xvdCBvZiB0aGlzLmdldFNsb3RzKCkpIHtcclxuICAgICAgICAgICAgbGV0IHNsb3RNYWNybyA9IHRva2VuSG90YmFyLmZpbmQobSA9PiBtLnNsb3QgPT0gc2xvdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRva2VuSG90YmFyU2xvdElzRW1wdHkgPSAhc2xvdE1hY3JvO1xyXG4gICAgICAgICAgICBpZiAodG9rZW5Ib3RiYXJTbG90SXNFbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNldCh1c2VySG90YmFyLCBzbG90KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b2tlbk1hY3JvID0gZ2FtZU1hY3Jvcy5maW5kKG0gPT4gbS5pZCA9PT0gc2xvdE1hY3JvIS5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodG9rZW5NYWNybykge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJIb3RiYXJbc2xvdF0gPSB0b2tlbk1hY3JvLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1ZhbGlkTWFjcm9zID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zZXQodXNlckhvdGJhciwgc2xvdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7IGhhc01hY3JvczogaGFzVmFsaWRNYWNyb3MsIGhvdGJhcjogdXNlckhvdGJhciB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUodG9rZW5JZDogc3RyaW5nLCBhY3RvcnM6IE1hcDxzdHJpbmcsIElBY3Rvcj4sIHRva2VuczogTWFwPHN0cmluZywgSVRva2VuPikge1xyXG4gICAgICAgIC8vIHVzZSB0aGUgZGVmYXVsdCBzdHJhdGVneSwgYmVjYXVzZSBvdGhlcndpc2UgYSBsaW5rZWQgaG90YmFyIG1pZ2h0IGJlIHJlbW92ZWQuXHJcbiAgICAgICAgLy8gRklYTUU6IGlkZWFsbHkgdGhpcyBzaG91bGQgbm90IGJlIGhhcmQgY29kZWQgaW4gaGVyZVxyXG4gICAgICAgIGNvbnN0IGZsYWdLZXkgPSBuZXcgSWRlbnRpdHlGbGFnc1N0cmF0ZWd5KGFjdG9ycywgdG9rZW5zKS5nZXQodG9rZW5JZCk7XHJcbiAgICAgICAgY29uc3QgZmxhZ3MgPSB0aGlzLmhvdGJhckZsYWcuZ2V0KHRva2VuSWQpO1xyXG4gICAgICAgIGRlbGV0ZSBmbGFnc1tmbGFnS2V5LmlkXTtcclxuICAgICAgICByZXR1cm4gdGhpcy5ob3RiYXJGbGFnLnNldCh0b2tlbklkLCBmbGFncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTbG90cygpIHtcclxuICAgICAgICBmdW5jdGlvbiByYW5nZShzaXplOiBudW1iZXIsIHN0YXJ0QXQgPSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbLi4uQXJyYXkoc2l6ZSkua2V5cygpXS5tYXAoaSA9PiBpICsgc3RhcnRBdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmFuZ2UoMTAsICh0aGlzLmhvdGJhclBhZ2UgLSAxKSAqIDEwICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bnNldCh1c2VySG90YmFyLCBzbG90OiBudW1iZXIpIHtcclxuICAgICAgICBkZWxldGUgdXNlckhvdGJhcltzbG90XTtcclxuICAgICAgICB1c2VySG90YmFyW2AtPSR7c2xvdH1gXSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYXNDaGFuZ2VzKGJhck1hY3JvcywgdG9rZW5NYWNyb3MpIHtcclxuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIltUb2tlbiBIb3RiYXJdXCIsIFwiQ29tcGFyaW5nXCIsIGJhck1hY3JvcywgdG9rZW5NYWNyb3MpO1xyXG4gICAgICAgIC8vIGNhbnQgbWFrZSBjaGFuZ2VzIGlmIHlvdSBhcmUgbm90IG9uIHRoZSBwYWdlXHJcbiAgICAgICAgaWYgKGJhck1hY3Jvcy5sZW5ndGggIT0gdG9rZW5NYWNyb3MubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGJhck1hY3Jvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYmFyTWFjcm9zW2ldLnNsb3QgIT0gdG9rZW5NYWNyb3NbaV0uc2xvdClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChiYXJNYWNyb3NbaV0ubWFjcm8uX2lkICE9IHRva2VuTWFjcm9zW2ldLmlkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzJztcclxuaW1wb3J0IHsgUGFnZUZsYWcgfSBmcm9tICcuLi9mbGFncy9wYWdlRmxhZyc7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uL2xvZ2dlcic7XHJcblxyXG5pbnRlcmZhY2UgRm91bmRyeUhvdGJhciB7XHJcbiAgICBwYWdlOiBudW1iZXI7XHJcbiAgICByZW5kZXI6IChmb3JjZT86IGJvb2xlYW4pID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VySG90YmFyIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2V0dGluZ3M6IFNldHRpbmdzLCBwcml2YXRlIGhvdGJhcjogRm91bmRyeUhvdGJhciwgcHJpdmF0ZSBwYWdlRmxhZzogUGFnZUZsYWcsIHByaXZhdGUgbG9nZ2VyOiBMb2dnZXIgPSBjb25zb2xlKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZ29Ub1BhZ2UoaGFzVG9rZW5TZWxlY3RlZDogYm9vbGVhbikge1xyXG4gICAgICAgIGlmIChoYXNUb2tlblNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdvVG9Ub2tlbkhvdGJhcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ29Ub0xhc3RBY3RpdmVQYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb1RvVG9rZW5Ib3RiYXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaG90YmFyLnBhZ2UgIT0gdGhpcy5zZXR0aW5ncy5ob3RiYXJQYWdlKVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2VGbGFnLnNldCh0aGlzLmhvdGJhci5wYWdlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKHRoaXMuc2V0dGluZ3MuaG90YmFyUGFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvVG9MYXN0QWN0aXZlUGFnZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5ob3RiYXIucGFnZSAhPSB0aGlzLnNldHRpbmdzLmhvdGJhclBhZ2UpXHJcbiAgICAgICAgICAgIHJldHVybjsgLy8gdXNlciBhbHJlYWR5IG1vdmVkIGF3YXkgZnJvbSB0aGUgdG9rZW4gaG90YmFyLlxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIodGhpcy5wYWdlRmxhZy5nZXQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXIocGFnZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ob3RiYXIucGFnZSA9IHBhZ2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCBfKSA9PiB7XHJcbiAgICAgICAgLy8gRklYTUU6IFJlbmRlciBkb2VzIG5vdCBhbHdheXMgd29yayB3aXRob3V0IHRoZSB0aW1lb3V0LlxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG90YmFyLnJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJbVG9rZW4gSG90YmFyXVwiLCBcInJlbmRlcmVkIHBhZ2VcIiwgcGFnZSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0sIDUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBMb2dnZXIge1xuICAgIGVycm9yKC4uLm1lc3NhZ2U6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICB3YXJuKC4uLm1lc3NhZ2U6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUud2Fybi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIGluZm8oLi4ubWVzc2FnZTogYW55W10pIHtcbiAgICAgICAgY29uc29sZS5pbmZvLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgZGVidWcoLi4ubWVzc2FnZTogYW55W10pIHtcbiAgICAgICAgaWYgKCg8YW55PndpbmRvdykuVG9rZW5Ib3RiYXI/LmRlYnVnKVxuICAgICAgICAgICAgY29uc29sZS5kZWJ1Zy5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gJy4vc2V0dGluZ3MnO1xyXG5pbXBvcnQgeyBUb2tlbkhvdGJhciB9IGZyb20gJy4vaG90YmFyL3Rva2VuSG90YmFyJztcclxuaW1wb3J0IHsgQ09OU1RBTlRTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBIb3RiYXJGbGFnc0ZhY3RvcnksIEZsYWdTdHJhdGVneUZhY3RvcnkgfSBmcm9tICcuL2ZsYWdzL2ZhY3RvcnknO1xyXG5pbXBvcnQgeyBVc2VySG90YmFyIH0gZnJvbSAnLi9ob3RiYXIvdXNlckhvdGJhcic7XHJcbmltcG9ydCB7IFBhZ2VGbGFnIH0gZnJvbSAnLi9mbGFncy9wYWdlRmxhZyc7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbi8vIFRPRE86IFJlbW92ZSBpbiB2My4wLjBcclxuZnVuY3Rpb24gbWlncmF0ZUZsYWcoKSB7XHJcbiAgICBsZXQgb2xkRGF0YSA9IGdhbWUudXNlci5nZXRGbGFnKFwid29ybGRcIiwgXCJ0b2tlbi1ob3RiYXJcIik7XHJcbiAgICBsZXQgbmV3RGF0YSA9IGdhbWUudXNlci5nZXRGbGFnKFwid29ybGRcIiwgQ09OU1RBTlRTLm1vZHVsZU5hbWUpO1xyXG4gICAgaWYgKCFvbGREYXRhIHx8IG5ld0RhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiW1Rva2VuIEhvdGJhcl1cIiwgXCJOb3RoaW5nIHRvIG1pZ3JhdGUuXCIsICEhb2xkRGF0YSwgISFuZXdEYXRhKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5pbmZvKFwiW1Rva2VuIEhvdGJhcl1cIiwgXCJNaWdyYXRpbmcgdG8gbmV3IGZsYWcga2V5LlwiKTtcclxuXHJcbiAgICBnYW1lLnVzZXIuc2V0RmxhZyhcIndvcmxkXCIsIENPTlNUQU5UUy5tb2R1bGVOYW1lLCBvbGREYXRhKTtcclxuICAgIGdhbWUudXNlci51bnNldEZsYWcoXCJ3b3JsZFwiLCBcInRva2VuLWhvdGJhclwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVG9rZW5Ib3RiYXIoKSB7XHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncygpLmxvYWQoZ2FtZS5zZXR0aW5ncyk7XHJcbiAgICBjb25zdCBob3RiYXJGbGFncyA9IG5ldyBIb3RiYXJGbGFnc0ZhY3Rvcnkoc2V0dGluZ3MpO1xyXG4gICAgY29uc3Qga2V5U3RyYXRlZ3kgPSBuZXcgRmxhZ1N0cmF0ZWd5RmFjdG9yeShzZXR0aW5ncywgZ2FtZSwgY2FudmFzKTtcclxuICAgIHJldHVybiBuZXcgVG9rZW5Ib3RiYXIoXHJcbiAgICAgICAgaG90YmFyRmxhZ3MuY3JlYXRlKCksXHJcbiAgICAgICAgdWkubm90aWZpY2F0aW9ucyxcclxuICAgICAgICBzZXR0aW5ncy5ob3RiYXJQYWdlLFxyXG4gICAgICAgIGtleVN0cmF0ZWd5LmNyZWF0ZUZsYWdLZXlTdHJhdGVneSgpLFxyXG4gICAgICAgIG5ldyBMb2dnZXIoKSk7XHJcbn1cclxuXHJcbkhvb2tzLm9uKFwiaW5pdFwiLCAoKSA9PiB7XHJcbiAgICBnYW1lLnNldHRpbmdzLnJlZ2lzdGVyKENPTlNUQU5UUy5tb2R1bGVOYW1lLCBTZXR0aW5ncy5rZXlzLmhvdGJhclBhZ2UsIHtcclxuICAgICAgICBuYW1lOiBcIlBhZ2VcIixcclxuICAgICAgICBoaW50OiBcIlRoZSBob3RiYXIgcGFnZSB0aGF0IHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgdG9rZW4gaG90YmFyLiBDaGFuZ2luZyB0aGlzIHdpbGwgd2lwZSBleGlzdGluZyB0b2tlbiBiYXJzIVwiLFxyXG4gICAgICAgIHNjb3BlOiBcIndvcmxkXCIsXHJcbiAgICAgICAgY29uZmlnOiB0cnVlLFxyXG4gICAgICAgIGRlZmF1bHQ6IDUsXHJcbiAgICAgICAgdHlwZTogTnVtYmVyXHJcbiAgICB9KTtcclxuXHJcbiAgICBnYW1lLnNldHRpbmdzLnJlZ2lzdGVyKENPTlNUQU5UUy5tb2R1bGVOYW1lLCBTZXR0aW5ncy5rZXlzLmxpbmtUb0xpbmtlZEFjdG9yLCB7XHJcbiAgICAgICAgbmFtZTogXCJMaW5rIHRvIGxpbmtlZCBhY3RvclwiLFxyXG4gICAgICAgIGhpbnQ6IFwiTGluayB0aGUgdG9rZW4gaG90YmFyIHRvIHRoZSBhY3RvciBpZiB0aGUgdG9rZW4gaXMgbGlua2VkLlwiLFxyXG4gICAgICAgIHNjb3BlOiBcIndvcmxkXCIsXHJcbiAgICAgICAgY29uZmlnOiB0cnVlLFxyXG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgdHlwZTogQm9vbGVhblxyXG4gICAgfSk7XHJcblxyXG4gICAgZ2FtZS5zZXR0aW5ncy5yZWdpc3RlcihDT05TVEFOVFMubW9kdWxlTmFtZSwgU2V0dGluZ3Mua2V5cy5hbHdheXNMaW5rVG9BY3Rvciwge1xyXG4gICAgICAgIG5hbWU6IFwiQWx3YXlzIGxpbmsgdG8gYWN0b3JcIixcclxuICAgICAgICBoaW50OiBcIkxpbmsgdGhlIHRva2VuIGhvdGJhciB0byB0aGUgYWN0b3IgZXZlbiBpZiB0aGUgdG9rZW4gaXMgdW5saW5rZWQuXCIsXHJcbiAgICAgICAgc2NvcGU6IFwid29ybGRcIixcclxuICAgICAgICBjb25maWc6IHRydWUsXHJcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgdHlwZTogQm9vbGVhblxyXG4gICAgfSk7XHJcblxyXG4gICAgZ2FtZS5zZXR0aW5ncy5yZWdpc3RlcihDT05TVEFOVFMubW9kdWxlTmFtZSwgU2V0dGluZ3Mua2V5cy5zaGFyZUhvdGJhciwge1xyXG4gICAgICAgIG5hbWU6IFwiU2hhcmUgdGhlIGhvdGJhciB3aXRoIG90aGVyIHBsYXllcnNcIixcclxuICAgICAgICBoaW50OiBcIldoZW4gc2V0IGV2ZXJ5IHRva2VuIHdpbGwgaGF2ZSBhIHNpbmdsZSBob3RiYXIgc2hhcmVkIGJ5IGFsbCBwbGF5ZXJzLlwiLFxyXG4gICAgICAgIHNjb3BlOiBcIndvcmxkXCIsXHJcbiAgICAgICAgY29uZmlnOiB0cnVlLFxyXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgIHR5cGU6IEJvb2xlYW5cclxuICAgIH0pO1xyXG5cclxuICAgIGdhbWUuc2V0dGluZ3MucmVnaXN0ZXIoQ09OU1RBTlRTLm1vZHVsZU5hbWUsIFNldHRpbmdzLmtleXMubG9ja0hvdGJhciwge1xyXG4gICAgICAgIG5hbWU6IFwiTG9jayBzaGFyZWQgaG90YmFyXCIsXHJcbiAgICAgICAgaGludDogXCJXaGVuIHNldCwgb25seSBhIEdNIGNhbiB1cGRhdGUgdGhlIHRva2VuIGhvdGJhci4gT25seSBhcHBsaWVzIHRvIHNoYXJlZCBob3RiYXJzLlwiLFxyXG4gICAgICAgIHNjb3BlOiBcIndvcmxkXCIsXHJcbiAgICAgICAgY29uZmlnOiB0cnVlLFxyXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgIHR5cGU6IEJvb2xlYW5cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiaW5pdGlhbGl6ZWQgVG9rZW4gSG90YmFyXCIpO1xyXG4gICAgc2V0VGltZW91dChtaWdyYXRlRmxhZywgMjAwKTtcclxufSk7XHJcblxyXG5Ib29rcy5vbihcInJlbmRlckhvdGJhclwiLCAoZGF0YTogYW55KSA9PiB7XHJcbiAgICAvLyBjb25zdCBtYWNyb3MgPSBkYXRhLm1hY3JvcztcclxuICAgIC8vIEZJWE1FOiBkdWUgdG8gYSByYWNlIGNvbmRpdGlvbiwgc29tZXRpbWVzIHRoZSB3cm9uZyBtYWNyb3MgYXJlIHBhc3NlZC5cclxuICAgIC8vICAgICAgICBXZSBhcmUgb25seSBpbnRlcmVzdGVkIGluIHRoZSBvbmVzIG9uIHRoZSB0b2tlbiBob3RiYXIuXHJcbiAgICAvLyAgICAgICAgISBXaWxsIGJlIHVubmVjZXNzYXJ5IHRvIGZpeCBpbiB2My4wLjAgKHNlcGFyYXRlIGhvdGJhciwgYWxsIHBhZ2VzL3Nsb3RzIHdpbGwgYmUgcmVsZXZhbnQpXHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncygpLmxvYWQoZ2FtZS5zZXR0aW5ncyk7XHJcbiAgICBjb25zdCBtYWNyb3MgPSAoPGFueT51aSkuaG90YmFyLl9nZXRNYWNyb3NCeVBhZ2Uoc2V0dGluZ3MuaG90YmFyUGFnZSk7XHJcblxyXG4gICAgY29uc3QgdG9rZW4gPSBjYW52YXMudG9rZW5zLmNvbnRyb2xsZWRbMF07XHJcbiAgICBpZiAodG9rZW4gJiYgc2V0dGluZ3MuaG90YmFyUGFnZSA9PT0gKDxhbnk+dWkpLmhvdGJhci5wYWdlKVxyXG4gICAgICAgIGNyZWF0ZVRva2VuSG90YmFyKCkuc2F2ZSh0b2tlbiwgbWFjcm9zLCAhc2V0dGluZ3MubG9ja0hvdGJhciB8fCBnYW1lLnVzZXIuaXNHTSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufSk7XHJcblxyXG5Ib29rcy5vbihcImNvbnRyb2xUb2tlblwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGNhbnZhcy50b2tlbnMuY29udHJvbGxlZFswXTtcclxuXHJcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XHJcbiAgICBjb25zdCB1aUhvdGJhciA9IG5ldyBVc2VySG90YmFyKG5ldyBTZXR0aW5ncygpLmxvYWQoZ2FtZS5zZXR0aW5ncyksICg8YW55PnVpKS5ob3RiYXIsIG5ldyBQYWdlRmxhZygpLCBsb2dnZXIpO1xyXG4gICAgaWYgKHRva2VuICYmIGNhbnZhcy50b2tlbnMuY29udHJvbGxlZC5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgIC8vIGhvdGJhciBkb2VzIG5vdCB5ZXQgZXhpc3Qgb24gZ2FtZS51c2VyLmRhdGEgYW5kIHVpIGRlZmluaXRpb25zLCBoZW5jZSB0aGUgY2FzdHMgdG8gYW55LlxyXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhcIltUb2tlbiBIb3RiYXJdXCIsIFwiY29udHJvbGxlZCB0b2tlblwiLCB0b2tlbik7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGNyZWF0ZVRva2VuSG90YmFyKClcclxuICAgICAgICAgICAgLmxvYWQodG9rZW4sIGR1cGxpY2F0ZSgoPGFueT5nYW1lLnVzZXIuZGF0YSkuaG90YmFyKSwgZ2FtZS5tYWNyb3MuZW50aXRpZXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChyZXN1bHQuaGFzTWFjcm9zKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGdhbWUudXNlci51cGRhdGUoe2hvdGJhcjogcmVzdWx0LmhvdGJhcn0pO1xyXG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoXCJbVG9rZW4gSG90YmFyXVwiLCBcInVwZGF0ZWQgaG90YmFyXCIsIHRva2VuLCByZXN1bHQuaG90YmFyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWlIb3RiYXIuZ29Ub1BhZ2UocmVzdWx0Lmhhc01hY3Jvcyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB1aUhvdGJhci5nb1RvUGFnZShmYWxzZSk7XHJcbiAgICAgICAgbG9nZ2VyLmRlYnVnKFwiW1Rva2VuIEhvdGJhcl1cIiwgXCJObyBvciBtdWx0aXBsZSBjb250cm9sbGVkIHRva2Vuc1wiKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59KTtcclxuXHJcbkhvb2tzLm9uKFwicHJlRGVsZXRlVG9rZW5cIiwgKF86IFNjZW5lLCB0b2tlbjogYW55KSA9PiB7XHJcbiAgICBjcmVhdGVUb2tlbkhvdGJhcigpLnJlbW92ZSh0b2tlbi5faWQsIGdhbWUuYWN0b3JzLCBjYW52YXMudG9rZW5zKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59KTtcclxuXHJcbkhvb2tzLm9uKFwicHJlRGVsZXRlQWN0b3JcIiwgKGFjdG9yOiBhbnkpID0+IHtcclxuICAgIGNyZWF0ZVRva2VuSG90YmFyKCkucmVtb3ZlKGFjdG9yLmRhdGEuX2lkLCBnYW1lLmFjdG9ycywgY2FudmFzLnRva2Vucyk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufSk7XHJcblxyXG5Ib29rcy5vbihcInJlYWR5XCIsICgpID0+IHtcclxuICAgIG1pZ3JhdGVGbGFnKCk7XHJcbn0pOyIsImltcG9ydCB7IENPTlNUQU5UUyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDbGllbnRTZXR0aW5nc1JlYWRlciB7XHJcbiAgICBnZXQoc2NvcGU6IHN0cmluZywga2V5OiBzdHJpbmcpOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XHJcbiAgICBhbHdheXNMaW5rVG9BY3RvcjogYm9vbGVhbjtcclxuICAgIGxpbmtUb0xpbmtlZEFjdG9yOiBib29sZWFuO1xyXG4gICAgaG90YmFyUGFnZTogbnVtYmVyO1xyXG4gICAgc2hhcmVIb3RiYXI6IGJvb2xlYW47XHJcbiAgICBsb2NrSG90YmFyOiBib29sZWFuO1xyXG5cclxuICAgIHN0YXRpYyBrZXlzID0ge1xyXG4gICAgICAgIGFsd2F5c0xpbmtUb0FjdG9yOiAnbGlua1RvQWN0b3InLFxyXG4gICAgICAgIGxpbmtUb0xpbmtlZEFjdG9yOiAnbGluaycsXHJcbiAgICAgICAgaG90YmFyUGFnZTogJ3BhZ2UnLFxyXG4gICAgICAgIHNoYXJlSG90YmFyOiAnc2hhcmUnLFxyXG4gICAgICAgIGxvY2tIb3RiYXI6ICdsb2NrJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgcHVibGljIGxvYWQoczogQ2xpZW50U2V0dGluZ3NSZWFkZXIpIHtcclxuICAgICAgICB0aGlzLmhvdGJhclBhZ2UgPSB0aGlzLmdldFNldHRpbmcocywgU2V0dGluZ3Mua2V5cy5ob3RiYXJQYWdlKTtcclxuXHJcbiAgICAgICAgdGhpcy5hbHdheXNMaW5rVG9BY3RvciA9IHRoaXMuZ2V0U2V0dGluZyhzLCBTZXR0aW5ncy5rZXlzLmFsd2F5c0xpbmtUb0FjdG9yKTtcclxuICAgICAgICB0aGlzLmxpbmtUb0xpbmtlZEFjdG9yID0gdGhpcy5nZXRTZXR0aW5nKHMsIFNldHRpbmdzLmtleXMubGlua1RvTGlua2VkQWN0b3IpIHx8IHRoaXMuYWx3YXlzTGlua1RvQWN0b3I7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcmVIb3RiYXIgPSB0aGlzLmdldFNldHRpbmcocywgU2V0dGluZ3Mua2V5cy5zaGFyZUhvdGJhcik7XHJcbiAgICAgICAgdGhpcy5sb2NrSG90YmFyID0gdGhpcy5nZXRTZXR0aW5nKHMsIFNldHRpbmdzLmtleXMubG9ja0hvdGJhcikgJiYgdGhpcy5zaGFyZUhvdGJhcjtcclxuICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U2V0dGluZyhzZXR0aW5nczogQ2xpZW50U2V0dGluZ3NSZWFkZXIsIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzLmdldChDT05TVEFOVFMubW9kdWxlTmFtZSwga2V5KVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==