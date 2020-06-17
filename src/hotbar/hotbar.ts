/**
 * slot is usually a number, but in order to unset it it sometimes has to be `-=<slot>`
 */
export type HotbarSlots = { [slot: string] : string | null }

export interface Hotbar {
    /**
     * List all visible token macros.
     */
    getTokenMacros(): { hotbar: HotbarSlots };

    /**
     * Update the list of visible token macros.
     * @param data 
     */
    setTokenMacros(data: { hotbar: HotbarSlots }): Promise<unknown>;
}