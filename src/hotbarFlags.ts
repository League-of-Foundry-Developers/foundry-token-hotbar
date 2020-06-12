import { Settings } from './settings';
import { CONSTANTS } from './constants';

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

export class HotbarFlagsFactory {
    constructor(private settings: Settings) { }

    public create() {
        const flagStrategy = this.createFlagStrategy();
        return new FoundryHotbarFlags(flagStrategy);  
    }

    private createFlagStrategy() {
        if (this.settings.shareHotbar) {
            if (this.settings.alwaysLinkToActor) {
                return new SharedAlwaysLinkedFlagsStrategy();
            }
            if (this.settings.linkToLinkedActor) {
                return new SharedLinkedFlagsStrategy();
            }
        }
        return new DefaultFlagsStrategy();
    }
}

export interface Identifiable {
    id: string;
}

// where to save strategies
export interface Flaggable extends Identifiable {
    getFlag(scope: string, key: string): any;
    setFlag(scope: string, key: string, data: any): Promise<Flaggable>;
    unsetFlag(scope: string, key: string): Promise<Flaggable>;
}

export abstract class FlagKeyStrategy {
    abstract get(entityId: string): string;

    protected getEntity(entityId: string) : Actor | Token {
        return game.actors.get(entityId) || canvas.tokens.get(entityId);
    }
}

// if shared, then no key required
export class SharedFlagKeyStrategy extends FlagKeyStrategy {
    get(_: string) {
        return "shared-macros";
    }
}

// else, if linked then linked actor or token
export class LinkedFlagKeyStrategy extends FlagKeyStrategy {
    get(entityId: string) {
        const entity = this.getEntity(entityId);
        if (entity instanceof Token) {
            return (entity.data.actorLink ? entity.actor : entity).id;
        }

        return entity.id;
    }
}

// else, if always then actor
export class AlwaysLinkedFlagKeyStrategy extends FlagKeyStrategy {
    get(entityId: string) {
        const entity = this.getEntity(entityId);
        if (entity instanceof Token) {
            return entity.actor.id;
        }

        return entity.id;
    }
}

export class DefaultFlagKeyStrategy extends FlagKeyStrategy {
    get(entityId: string) {
        return entityId;
    }
}
// else, token

// The entity on which to store the flags
export abstract class FlagsStrategy {
    /**
     * 
     * @param entityId The id of the actor or token
     */
    abstract get(entityId: string): Flaggable;

    protected getEntity(entityId: string) : Actor | Token {
        return game.actors.get(entityId) || canvas.tokens.get(entityId);
    }
}

export class DefaultFlagsStrategy extends FlagsStrategy {
    get(_: string): Flaggable {
        return game.user;
    }
}

export class SharedLinkedFlagsStrategy extends FlagsStrategy {
    get(entityId: string): Flaggable {
        const entity = this.getEntity(entityId);
        if (entity instanceof Token) {
            return entity.data.actorLink ? entity.actor : entity;
        }

        return entity;
    }
}

export class SharedAlwaysLinkedFlagsStrategy extends FlagsStrategy {
    get(entityId: string): Flaggable {
        const entity = this.getEntity(entityId);
        if (entity instanceof Token) {
            return entity.actor;
        }

        return entity;
    }
}