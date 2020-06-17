import { Macro } from '../foundry';

export interface FoundryUiHotbar {
    page: number;
    _getMacrosByPage: (page: number) => Macro[];
    render: (force?: boolean) => void;
    expand: () => Promise<unknown>;
    collapse: () => Promise<unknown>;
}

export interface UiHotbar {
    toggleHotbar(showTokenBar: boolean): Promise<unknown>;
    showTokenHotbar(): Promise<unknown>;
    hideTokenHotbar(): Promise<unknown>;
}

export const calculatePageSlots = (page: number) => {
    function range(size: number, startAt = 0) {
        return [...Array(size).keys()].map(i => i + startAt);
    }
    return range(10, (page - 1) * 10 + 1);
}

