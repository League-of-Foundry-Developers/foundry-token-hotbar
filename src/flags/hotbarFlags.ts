import { CONSTANTS } from '../utils/constants';
import { Flaggable, duplicate } from '../utils/foundry';
import { FlagsStrategy } from './flagStrategies';
import { HotbarSlots } from '../hotbar/hotbar';
import { Logger } from '../utils/logger';

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
    constructor(protected flagStrategy: FlagsStrategy, protected logger: Logger) { }

    get(tokenId: string): HotbarData {
        const entity = this.flagStrategy.get(tokenId);
        const flags = entity.getFlag(CONSTANTS.module.name, this.key) || {};
        // duplicate the flags, as they are a reference to the flags on the entity
        // when updating them, Foundry will compare with the flags on the entity.
        return duplicate(flags);
    }

    set(tokenId: string, data: HotbarData): Promise<Flaggable> {
        const entity = this.flagStrategy.get(tokenId);
        this.logger.debug('[Token Hotbar]', 'Storing data for token', tokenId, entity, this.key, data);
        this.updateKeysOfEmptySlots(data);
        return entity.setFlag(CONSTANTS.module.name, this.key, data);
    }

    private updateKeysOfEmptySlots(data: HotbarData) {
        for (const tokenId in data) {
            for (const slot in data[tokenId]) {
                if (!data[tokenId][slot]) {
                    delete data[tokenId][slot];
                    //data[tokenId][`-=${slot}`] = null;
                }
            }
        }
    }
}
