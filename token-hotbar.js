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

    async function loadBar(token, page) {
        const userBar = duplicate(game.user.data.hotbar);
        const hotBars = getBars();
        console.debug("[Token Hotbar]", "Loading", token.id, hotBars[token.id]);

        for(let slot of getSlots(page)) {
            let macro = (hotBars[token.id] || []).find(m => m.slot == slot);
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
        let tokenBars = getBars();
        tokenBars[token.id] = hotbarItems.map(item => { return {
            slot: item.slot,
            id: item.macro._id
        }});
        console.debug("[Token Hotbar]", "Saving", token.id, tokenBars);
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
})();