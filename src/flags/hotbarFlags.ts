import { CONSTANTS } from '../constants';
import { Flaggable } from '../foundry';
import { FlagsStrategy } from './flagStrategies';
import { HotbarSlots } from '../hotbar/hotbar';

export interface HotbarItem {
    id: string,
    slot: number
}

export type OldHotbarData = { [tokenId: string]: HotbarItem[] };
export type HotbarData = { [tokenId: string]: HotbarSlots }

export interface HotbarFlags { 
    /**
     * Retrieves the hotbar for a particular entity.
     * POST: Return value is always an object.
     * @param entity the token or actor to get the hotbar for.
     */
    get(tokenId: string): HotbarData;

    set(tokenId: string, data: HotbarData): Promise<Flaggable>;
}

export class ModuleHotbarFlags implements HotbarFlags {
    private readonly key = 'hotbar-data';
    constructor(protected flagStrategy: FlagsStrategy) { }

    get(tokenId: string): HotbarData {
        const flags = this.flagStrategy.get(tokenId);
        return flags.getFlag(CONSTANTS.moduleName, this.key) || {};
    }

    set(tokenId: string, data: HotbarData): Promise<Flaggable> {
        return this.flagStrategy.get(tokenId)
            .unsetFlag(CONSTANTS.moduleName, this.key)
            .then(entity => {
                return entity.setFlag(CONSTANTS.moduleName, this.key, data);
            });
    }
}
