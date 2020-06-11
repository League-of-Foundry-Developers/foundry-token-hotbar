import { Settings } from './settings';
import { CONSTANTS } from './constants';

export interface HotbarItem {
    id: string,
    slot: Number
}

export type HotbarData = { [tokenId: string]: HotbarItem[] };

export interface HotbarFlags { 
    get(entity: Token | Actor): HotbarData;
    set(entity: Token | Actor, data: HotbarData): Promise<Entity | PlaceableObject>;
}

export class FoundryHotbarFlags implements HotbarFlags {
    constructor(private settings: Settings) { }

    get(entity: Token | Actor): HotbarData {
        const flags = this.getFlags(entity);
        const result = flags.getFlag('world', CONSTANTS.moduleName) || {};
        return result;
    }

     set(entity: Token | Actor, data: HotbarData) {
        return this.getFlags(entity)
            .unsetFlag("world", CONSTANTS.moduleName)
            .then(entity => entity.setFlag('world', CONSTANTS.moduleName, data));
    }

    private getFlags(entity: Token | Actor) {
        return this.settings.shareHotbar ? entity : game.user;
    }
}