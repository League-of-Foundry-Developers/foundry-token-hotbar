import { Flaggable, IToken, IActor } from '../../src/utils/foundry';
import { HotbarData } from '../../src/flags/hotbarFlags';

export class TestFlaggable implements Flaggable {
    public data: { flags: { [scope: string]: { [key: string]: HotbarData | undefined } } }

    constructor(public id: string) {
        this.data = { flags: { } };
    }

    getFlag(scope: string, key: string): HotbarData | undefined {
        const scoped = this.data.flags[scope];
        return scoped ? scoped[key] : undefined;
    }

    setFlag(scope: string, key: string, data?: HotbarData): Promise<Flaggable> {
        const scoped = this.data.flags[scope];
        if (!scoped) {
            const newScope = { [key]: data };
            this.data.flags[scope] = newScope;
        } else {
            this.data.flags[scope][key] = data;
        }
        return Promise.resolve(this);
    }
    unsetFlag(scope: string, key: string): Promise<Flaggable> {
        const scoped= this.data.flags[scope];
        if (scoped) {
            delete this.data.flags[scope][key];
        }
        return Promise.resolve(this);
    }
}

export class TestToken extends TestFlaggable implements IToken {
    public data: { flags: { [scope: string] : { [key: string] : HotbarData | undefined } }, actorLink: boolean };
    public actor?: IActor;

    constructor(id: string, actor: IActor | undefined) {
        super(id);
        this.data['actorLink'] = !!actor;
        this.actor = actor;
    }
}