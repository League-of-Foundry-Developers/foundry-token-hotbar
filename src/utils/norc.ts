import { HotbarSlots } from '../hotbar/hotbar';
export interface UiCustomHotbar {
    populator: {
        chbGetMacros: () => HotbarSlots;
        chbSetMacros: (HotbarSlots) => Promise<unknown>;
    }
}