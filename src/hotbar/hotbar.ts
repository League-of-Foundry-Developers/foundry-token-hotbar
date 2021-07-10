import { IActor, IToken } from "../utils/foundry";

/**
 * slot is a number.
 */
export type HotbarSlots = { [slot: number] : string | undefined }
export type HotbarSlot = { slot: number, macroId: string }

/**
 * This interface describes a persisted hotbar.
 */
export interface Hotbar {
    /**
     * List all macros on a given page.
     */
    getMacrosByPage(page: number): { hotbar: HotbarSlots };

    /**
     * Update the list of visible token macros.
     * @param data
     */
    setTokenMacros(page: number, data: { hotbar: HotbarSlots }): Promise<unknown>;

    /**
     * Given some hotbar slots, offset them such that they are on the Token Hotbar page.
     *
     * This was added, because Custom Hotbar only has one page
     * and the Token Hotbar settings might indicate that page 5 is used.
     * This function helps faking Custom Hotbar being on page 5,
     * so that when Custom Hotbar is disabled, the Token Hotbar is still showed on page 5 of Foundry's Hotbar.
     */
    offset(data: HotbarSlots): HotbarSlots;
}

export interface TokenBarRemover {
    /**
     * Remove all Token Macros for a given id (actor or token).
     * @param actors Map of actors by id (e.g. game.actors)
     * @param tokens Map of tokens by id (e.g. canvas.tokens)
     */
    removeTokenMacros(actors: Map<string, IActor>, tokens: Map<string, IToken>): Promise<unknown>;
}