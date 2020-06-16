import { Flaggable, IActor, IToken } from '../foundry';

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

export class UserFlagsStrategy extends FlagsStrategy {
    constructor(private user: Flaggable, actors: Map<string, IActor>, tokens: Map<string, IToken>) { 
        super(actors, tokens);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get(_entityId: string): Flaggable {
        return this.user;
    }
}

export class IdentityFlagsStrategy extends FlagsStrategy {
    constructor(actors: Map<string, IActor>, tokens: Map<string, IToken>) { 
        super(actors, tokens);
    }

    get(entityId: string): Flaggable {
        return this.getEntity(entityId);
    }
}

export class LinkedFlagsStrategy extends FlagsStrategy {
    get(entityId: string): Flaggable {
        const entity = this.getEntity(entityId);
        return this.isToken(entity) && entity.data.actorLink && entity.actor
            ? entity.actor
            : entity;
    }
}

export class AlwaysLinkedFlagsStrategy extends FlagsStrategy {
    get(entityId: string): Flaggable {
        const entity = this.getEntity(entityId);
        if (this.isToken(entity) && entity.actor)
            return entity.actor;

        return entity;
    }
}