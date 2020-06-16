import { Flaggable, IToken, IActor } from '../../src/foundry';
import { HotbarData } from '../../src/flags/hotbarFlags';

export class TestFlaggable implements Flaggable {
    private flags = new Map<string, HotbarData | undefined>();

    constructor(public id: string) { }

    getFlag(scope: string, key: string): HotbarData | undefined {
        return this.flags.get(key);
    }
    setFlag(scope: string, key: string, data?: HotbarData): Promise<Flaggable> {
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