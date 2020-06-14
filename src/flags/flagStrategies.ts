import { Flaggable, IActor, IToken } from "../foundry";

export abstract class FlagsStrategy {

    constructor(protected actors: Map<string, IActor>, protected tokens: Map<string, IToken>) { }
    /**
     * @param entityId The id of the actor or token
     */
    abstract get(entityId: string): Flaggable;

    protected getEntity(entityId: string) : IActor | IToken {
        return this.actors.get(entityId) || this.tokens.get(entityId)!;
    }

    protected isToken(entity: any): entity is IToken {
        return 'actor' in entity;
    }
}

export class UserFlagsStrategy extends FlagsStrategy {
    constructor(private user: Flaggable, actors: Map<string, IActor>, tokens: Map<string, IToken>) { 
        super(actors, tokens);
    }

    get(_: string): Flaggable {
        return this.user;
    }
}

export class IdentityFlagsStrategy extends FlagsStrategy {
    constructor(actors: Map<string, IActor>, tokens: Map<string, IToken>) { 
        super(actors, tokens);
    }

    get(entityId: string): Flaggable {
        return this.actors.get(entityId) || this.tokens.get(entityId)!;
    }
}

export class LinkedFlagsStrategy extends FlagsStrategy {
    get(entityId: string): Flaggable {
        const entity = this.getEntity(entityId);
        if (this.isToken(entity)) {
            return entity.data.actorLink ? entity.actor! : entity;
        }

        return entity;
    }
}

export class AlwaysLinkedFlagsStrategy extends FlagsStrategy {
    get(entityId: string): Flaggable {
        const entity = this.getEntity(entityId);
        if (this.isToken(entity)) {
            return entity.actor!;
        }

        return entity;
    }
}