import { HotbarFlags, HotbarData} from '../../src/hotbarFlags';

export class TestHotbarFlags implements HotbarFlags {
    private flags: HotbarData;

    get(entity: any): HotbarData {
        return this.flags || {};
    }
    set(entity: any, data: HotbarData): Promise<any> {
        this.flags = data;
        return Promise.resolve();
    }
}