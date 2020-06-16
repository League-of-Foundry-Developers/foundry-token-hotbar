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

export class MigratingHotbarFlags extends ModuleHotbarFlags {
    constructor(flagStrategy: FlagsStrategy) {
        super(flagStrategy);
    }

    get(tokenId: string): HotbarData {
        const value = super.get(tokenId);
        if (Object.keys(value).length > 0) 
            return value;

        const flags = this.flagStrategy.get(tokenId);
        const oldValue = flags.getFlag('world', CONSTANTS.moduleName) || {};

        super.set(tokenId, oldValue);
        flags.unsetFlag('world', CONSTANTS.moduleName);

        return oldValue;
    }
}