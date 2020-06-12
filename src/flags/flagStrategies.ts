import { Flaggable } from "../foundry";

export abstract class FlagsStrategy {
    /**
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