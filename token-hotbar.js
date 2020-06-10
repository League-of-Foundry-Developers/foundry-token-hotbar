(() => {
    function getSlots(page) {
        function range(size, startAt = 0) {
            return [...Array(size).keys()].map(i => i + startAt);
        }

        return range(10, (page - 1) * 10);
    }

    function getBars() {
        return game.user.getFlag("world", "token-hotbar") || {};
    }

    async function setBars(tokenBars) {
        await game.user.unsetFlag("world", "token-hotbar");
        return game.user.setFlag("world", "token-hotbar", tokenBars);
    }

    function getTokenBarPage() {
        return game.settings.get("TokenHotbar", "page");
    }

    function useLink() { return game.settings.get("TokenHotbar", "link") || game.settings.get("TokenHotbar", "linkToActor"); }

    function getTokenId(token) {
        if ((token.data.actorLink && useLink()) || game.settings.get("TokenHotbar", "linkToActor")) {
            return token.actor.id;
        }

        return token.id;
    }

    async function loadBar(token, page) {
        const userBar = duplicate(game.user.data.hotbar);
        const hotBars = getBars();
        const tokenId = getTokenId(token);

        console.debug("[Token Hotbar]", "Loading", tokenId, hotBars[tokenId]);

        for(let slot of getSlots(page)) {
            let macro = (hotBars[tokenId] || []).find(m => m.slot == slot);
            macro = macro && game.macros.find(m => m.id === macro.id);
            if (!macro && (slot in userBar)) {
                delete userBar[slot];
                userBar[`-=${slot}`] = null;
            }
            else if (macro) {
                userBar[slot] = macro.id;
            }
        }
        await game.user.update({hotbar: userBar});
    }

    function saveBar(token, hotbarItems) {
        const tokenBars = getBars();
        const tokenId = getTokenId(token);
        tokenBars[tokenId] = hotbarItems.map(item => { return {
            slot: item.slot,
            id: item.macro._id
        }});
        console.debug("[Token Hotbar]", "Saving", tokenId, tokenBars);
        setBars(tokenBars);
    }

    function removeBar(tokenId) {
        let tokenBars = getBars();
        delete tokenBars[tokenId];
        console.debug("[Token Hotbar]", "Removing", tokenId, tokenBars);
        setBars(tokenBars);
    }

    Hooks.on("init", () => {
        game.settings.register("TokenHotbar", "page", {
            name: "Page",
            hint: "The hotbar page that will be replaced with the token hotbar. Changing this will wipe existing token bars!",
            scope: "world",
            config: true,
            default: 5,
            type: Number
        });

        game.settings.register("TokenHotbar", "link", {
            name: "Link to actor",
            hint: "Link the token hotbar to the actor if the token is linked.",
            scope: "world",
            config: true,
            default: true,
            type: Boolean
        });

        game.settings.register("TokenHotbar", "linkToActor", {
            name: "Always link to actor",
            hint: "Link the token hotbar to the actor even if the token is unlinked.",
            scope: "world",
            config: true,
            default: false,
            type: Boolean
        });
    });
    
    Hooks.on("renderHotbar", (data) => {
        const token = canvas.tokens.controlled[0];

        if (data.page == getTokenBarPage() && token) {
            saveBar(token, data.macros.filter(m => m.macro));
        }

        return true;
    });

    Hooks.on("controlToken", () => {
        if (canvas.tokens.controlled.length == 1) {
            loadBar(canvas.tokens.controlled[0], getTokenBarPage());
        }
        return true;
    });

    Hooks.on("deleteToken", (_, token) => {
        if (!useLink() || !token.actorLink) {
            removeBar(token._id);
        }
        return true;
    });

    Hooks.on("deleteActor", (actor) => {
        removeBar(actor.data._id);
        return true;
    });
})();