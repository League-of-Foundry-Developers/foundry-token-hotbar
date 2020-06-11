import { Settings } from './settings';
import { CONSTANTS } from './constants';

export interface HotbarItem {
    id: string,
    slot: Number
}

export type HotbarData = { [tokenId: string]: HotbarItem[] };

export interface HotbarFlags { 
    get(entity: Token | Actor): HotbarData;
    set(entity: Token | Actor, data: HotbarData): Promise<void>;
}

export class FoundryHotbarFlags implements HotbarFlags {
    constructor(private settings: Settings) { }

    get(entity: Token | Actor): HotbarData {
        const flags = this.getFlags(entity);
        return flags.getFlag('world', CONSTANTS.moduleName);
    }

    async set(entity: Token | Actor, data: HotbarData) {
        const flags = this.getFlags(entity);

        await flags.unsetFlag("world", "token-hotbar");
        flags.setFlag('world', CONSTANTS.moduleName, data);
    }

    private getFlags(entity: Token | Actor) {
        return this.settings.shareHotbar ? entity : game.user;
    }
}