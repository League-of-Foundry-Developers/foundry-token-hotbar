import { CONSTANTS } from '../constants';
import { FlagsStrategy } from './flagStrategies';
import { Flaggable } from '../foundry';

export interface HotbarItem {
    id: string,
    slot: Number
}

export type HotbarData = { [tokenId: string]: HotbarItem[] };

export interface HotbarFlags { 
    /**
     * Retrieves the hotbar for a particular entity.
     * POST: Return value is always an object.
     * @param entity the token or actor to get the hotbar for.
     */
    get(tokenId: string): HotbarData;

    set(tokenId: string, data: HotbarData): Promise<Flaggable>;
}

export class FoundryHotbarFlags implements HotbarFlags {
    constructor(private getFlagStrategy: FlagsStrategy) { }

    get(tokenId: string): HotbarData {
        const flags = this.getFlagStrategy.get(tokenId);
        const result = flags.getFlag('world', CONSTANTS.moduleName) || {};
        return result;
    }

    set(tokenId: string, data: HotbarData) {
        return this.getFlagStrategy.get(tokenId)
            .unsetFlag("world", CONSTANTS.moduleName)
            .then(entity => entity.setFlag('world', CONSTANTS.moduleName, data));
    }
}
