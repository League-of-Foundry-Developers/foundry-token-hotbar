import { HotbarSlots } from './hotbar';

/**
 * This interface describes the hotbar as a user interface element.
 */
export interface UiHotbar {
    /**
     * Show or hide the hotbar.
     * @param showTokenBar
     */
    toggleHotbar(showTokenBar: boolean): Promise<unknown>;
    showTokenHotbar(): Promise<unknown>;
    hideTokenHotbar(): Promise<unknown>;

    /**
     * Get the page number where the Token Hotbar is displayed.
     */
    getTokenHotbarPage(): number;

    /**
     * Get whether the hotbar is showing the Token Hotbar page.
     */
    onTokenHotbarPage(): boolean;

    /**
     * Get the number of the page that is currently displayed.
     */
    currentPage(): number;
}

/**
 * Given a page number,
 * return an array with the number of the slots on that page.
 * @param page
 */
export const calculatePageSlots = (page: number): number[] => {
    function range(size: number, startAt = 0) {
        return [ ...Array(size).keys() ].map(i => i + startAt);
    }
    return range(10, (page - 1) * 10 + 1);
};

/**
 * Given a page number and all hotbar slots (even those on other pages),
 * return a continuous array of only the hotbar slots of the given page.
 * @param page
 * @param allSlots
 */
export const pickPageSlots = (page: number, allSlots: HotbarSlots): HotbarSlots => {
    return calculatePageSlots(page)
        .reduce<HotbarSlots>((acc, cur) => (acc[cur] = allSlots[cur], acc), {});
};
