import { OldHotbarData, HotbarData } from '../flags/hotbarFlags';
import { HotbarSlots } from '../hotbar/hotbar';
import { Flaggable } from './foundry';
import { CONSTANTS } from './constants';

export interface DataFlaggable extends Flaggable {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { flags: { [key: string]: any } }
}

export class Migration {
    constructor(private flaggables: DataFlaggable[]) { }

    async migrate(): Promise<Error[]> {
        const errors: Error[] = [];
        for (const flaggable of this.flaggables) {
            console.log('Migrating', flaggable);
            let oldFlags = flaggable.data.flags[CONSTANTS.module.name];
            if (!oldFlags) {
                oldFlags = flaggable.data.flags.world?.[CONSTANTS.module.name];
            }

            if (oldFlags) {
                console.log('Migrating data', oldFlags);
                for (const key in oldFlags) {
                    try {
                        const newData = this.translateDataStructure(oldFlags[key]);
                        await this.delay(50); // prevent race conditions
                        await flaggable.unsetFlag(CONSTANTS.module.name, key);
                        await flaggable.setFlag(CONSTANTS.module.name, key, newData);
                    } catch (e) {
                        errors.push(e);
                    }
                }
                await flaggable.unsetFlag('world', CONSTANTS.module.name);
            }
        }
        return errors;
    }

    public translateDataStructure(oldData: OldHotbarData): HotbarData {
        const newData: HotbarData = {};
        for (const id in oldData) {
            console.log("  Migrating", "translating", oldData[id]);
            newData[id] = oldData[id].reduce<HotbarSlots>((acc, cur) => (acc[cur.slot] = cur.id, acc), {});
        }
        return newData;
    }

    private delay(timeoutMs) {
        return new Promise(resolve => {
            setTimeout(resolve, timeoutMs);
        });
    }

}