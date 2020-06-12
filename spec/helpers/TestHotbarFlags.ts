import { HotbarFlags, HotbarData} from '../../src/flags/hotbarFlags';

export class TestHotbarFlags implements HotbarFlags {
    private flags: HotbarData;

    get(tokenId: string): HotbarData {
        return this.flags || {};
    }
    set(tokenId: string, data: HotbarData): Promise<any> {
        this.flags = data;
        return Promise.resolve();
    }
}