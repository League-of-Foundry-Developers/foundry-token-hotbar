import { CONSTANTS } from '../constants';
import { Flaggable } from '../foundry';
import { FlagsStrategy } from './flagStrategies';

export interface HotbarItem {
    id: string,
    slot: number
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

    set(tokenId: string, data: HotbarData): Promise<Flaggable> {
        return this.getFlagStrategy.get(tokenId)
            .unsetFlag('world', CONSTANTS.moduleName)
            .then(entity => {
                return entity.setFlag('world', CONSTANTS.moduleName, data);
            });
    }
}
