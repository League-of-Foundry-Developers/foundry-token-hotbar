import { Flaggable, IToken, IActor } from '../../src/foundry';

export class TestFlaggable implements Flaggable {
    private flags = new Map<string, any>();

    constructor(public id: string) { }

    getFlag(scope: string, key: string) {
        return this.flags.get(key);
    }
    setFlag(scope: string, key: string, data: any): Promise<Flaggable> {
        this.flags.set(key, data);
        return Promise.resolve(this);
    }
    unsetFlag(scope: string, key: string): Promise<Flaggable> {
        this.flags.set(key, undefined);
        return Promise.resolve(this);
    }
}

export class TestToken extends TestFlaggable implements IToken {
    public data: { actorLink: boolean };
    public actor?: IActor;

    constructor(id: string, actor: IActor | undefined) {
        super(id);
        this.data = { actorLink: !!actor };
        this.actor = actor;
    }
}