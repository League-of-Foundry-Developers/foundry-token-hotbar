import { IActor, IToken } from "../utils/foundry";

/**
 * slot is usually a number, but in order to unset it it sometimes has to be `-=<slot>`
 */
export type HotbarSlots = { [slot: number] : string | undefined }
export type HotbarSlot = { slot: number, macroId: string }

export interface Hotbar {
    /**
     * List all visible token macros.
     */
    getMacrosByPage(page: number): { hotbar: HotbarSlots };

    /**
     * Update the list of visible token macros.
     * @param data
     */
    setTokenMacros(page: number, data: { hotbar: HotbarSlots }): Promise<unknown>;

    /**
     *
     */
    offset(data: HotbarSlots): HotbarSlots;
}

export interface TokenBarRemover {
    removeTokenMacros(actors: Map<string, IActor>, tokens: Map<string, IToken>): Promise<unknown>;
}