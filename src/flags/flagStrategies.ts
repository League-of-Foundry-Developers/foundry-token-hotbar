/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flaggable, IActor, IToken } from '../utils/foundry';

/**
 * Provides the entity where to save the Token Hotbar on.
 * @see FlagStrategyFactory for usage.
 */
export abstract class FlagsStrategy {

    constructor(protected actors: Map<string, IActor>, protected tokens: Map<string, IToken>) { }
    /**
     * @param entityId The id of the actor or token
     */
    abstract get(entityId: string): Flaggable;

    protected getEntity(entityId: string) : IActor | IToken {
        const entity = this.actors.get(entityId) || this.tokens.get(entityId);
        if (!entity) {
            throw new Error(`No actor or token exists with id '${entityId}'`);
        }
        return entity;
    }

    protected isToken(entity: IToken | IActor): entity is IToken {
        return 'actor' in entity;
    }
}

/**
 * Used to save the Token Hotbar on the user.
 */
export class UserFlagsStrategy extends FlagsStrategy {
    constructor(private user: Flaggable, actors: Map<string, IActor>, tokens: Map<string, IToken>) {
        super(actors, tokens);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get(_entityId: string): Flaggable {
        return this.user;
    }
}

/**
 * Use to save the Token Hotbar on the given entity.
 */
export class IdentityFlagsStrategy extends FlagsStrategy {
    constructor(actors: Map<string, IActor>, tokens: Map<string, IToken>) {
        super(actors, tokens);
    }

    get(entityId: string): Flaggable {
        return this.getEntity(entityId);
    }
}

/**
 * Use to save the Token Hotbar on actor, if the provided entity is a token with a linked actor.
 * Otherwise it will return given entity.
 */
export class LinkedFlagsStrategy extends FlagsStrategy {
    get(entityId: string): Flaggable {
        const entity = this.getEntity(entityId);
        return this.isToken(entity) && entity.data.actorLink && entity.actor
            ? this.actors.get(entity.actor.id)!
            : entity;
    }
}

/**
 * Use to save the Token Hotbar on actor, even if the provided token is not linked to the actor.
 * If the provided entity is not a token or no longer contains a reference to the token,
 * it will return the given entity.
 */
export class AlwaysLinkedFlagsStrategy extends FlagsStrategy {
    get(entityId: string): Flaggable {
        const entity = this.getEntity(entityId);
        if (this.isToken(entity) && entity.actor)
            return this.actors.get(entity.actor.id)!;

        return entity;
    }
}