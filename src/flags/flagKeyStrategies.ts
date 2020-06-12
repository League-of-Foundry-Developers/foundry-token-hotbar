export abstract class FlagKeyStrategy {
    abstract get(entityId: string): string;

    protected getEntity(entityId: string) : Actor | Token {
        return game.actors.get(entityId) || canvas.tokens.get(entityId);
    }
}

export class DefaultFlagKeyStrategy extends FlagKeyStrategy {
    get(entityId: string) {
        return entityId;
    }
}

export class SharedFlagKeyStrategy extends FlagKeyStrategy {
    get(_: string) {
        return "shared-macros";
    }
}

export class LinkedFlagKeyStrategy extends FlagKeyStrategy {
    get(entityId: string) {
        const entity = this.getEntity(entityId);
        if (entity instanceof Token) {
            return (entity.data.actorLink ? entity.actor : entity).id;
        }

        return entity.id;
    }
}

export class AlwaysLinkedFlagKeyStrategy extends FlagKeyStrategy {
    get(entityId: string) {
        const entity = this.getEntity(entityId);
        if (entity instanceof Token) {
            return entity.actor.id;
        }

        return entity.id;
    }
}