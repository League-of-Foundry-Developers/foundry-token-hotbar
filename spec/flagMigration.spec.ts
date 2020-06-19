import 'jasmine';
import { Migration, DataFlaggable } from '../src/utils/migration';
import { OldHotbarData, HotbarData } from '../src/flags/hotbarFlags';
import { TestFlaggable } from './helpers/TestToken';
import { CONSTANTS } from '../src/utils/constants';

describe('migration.translateDataStructure', function () {
    it('changes OldHotbarData into HotbarData', function () {
        const migration = new Migration([]);
        const oldData: OldHotbarData = {
            'token-1': [ { slot: 1, id: '345b' }, { slot: 41, id: 'jkl567'} ],
            'token-2': [ { slot: 1, id: '3k46jb' }, { slot: 23, id: '7s0'} ],
        };
        const expectedData: HotbarData = {
            'token-1': { 1: '345b', 41: 'jkl567' },
            'token-2': { 1: '3k46jb', 23: '7s0' }
        };

        const actualData: HotbarData = migration.translateDataStructure(oldData);

        expect(actualData).toEqual(expectedData);
    });

    it('unsets the HotbarData flag on world', async function () {
        const oldData: OldHotbarData = {
            'token-1': [ { slot: 1, id: '345b' }, { slot: 41, id: 'jkl567'} ],
            'token-2': [ { slot: 1, id: '3k46jb' }, { slot: 23, id: '7s0'} ],
        };

        const flaggable = <DataFlaggable><unknown>new TestFlaggable('some-token');
        flaggable.data = {
            flags: { world: { [CONSTANTS.module.name]: { [flaggable.id]: oldData} } }
        };

        spyOn(flaggable, 'unsetFlag');
        spyOn(flaggable, 'setFlag');
    
        const migrator = new Migration([ flaggable ]);
        const errors = await migrator.migrate();
        errors.map(e => console.error(e));

        expect(errors.length).toEqual(0);
        expect(flaggable.unsetFlag).toHaveBeenCalledTimes(2);
        expect(flaggable.unsetFlag).toHaveBeenCalledWith(CONSTANTS.module.name, flaggable.id);
        expect(flaggable.unsetFlag).toHaveBeenCalledWith('world', CONSTANTS.module.name);

        expect(flaggable.setFlag).toHaveBeenCalledTimes(1);
        expect(flaggable.setFlag).toHaveBeenCalledWith(CONSTANTS.module.name, flaggable.id, migrator.translateDataStructure(oldData));
    });

    it('unsets the HotbarData flag on the entity', async function () {
        const oldData: OldHotbarData = {
            'token-1': [ { slot: 1, id: '345b' }, { slot: 41, id: 'jkl567'} ],
            'token-2': [ { slot: 1, id: '3k46jb' }, { slot: 23, id: '7s0'} ],
        };

        const flaggable = <DataFlaggable><unknown>new TestFlaggable('some-token');
        flaggable.data = {
            flags: { [CONSTANTS.module.name]: { [flaggable.id]: oldData} }
        };

        spyOn(flaggable, 'unsetFlag');
        spyOn(flaggable, 'setFlag');
    
        const migrator = new Migration([ flaggable ]);
        const errors = await migrator.migrate();
        errors.map(e => console.error(e));

        expect(errors.length).toEqual(0);
        expect(flaggable.unsetFlag).toHaveBeenCalledTimes(2);
        expect(flaggable.unsetFlag).toHaveBeenCalledWith(CONSTANTS.module.name, flaggable.id);
        expect(flaggable.unsetFlag).toHaveBeenCalledWith('world', CONSTANTS.module.name);

        expect(flaggable.setFlag).toHaveBeenCalledTimes(1);
        expect(flaggable.setFlag).toHaveBeenCalledWith(CONSTANTS.module.name, flaggable.id, migrator.translateDataStructure(oldData));
    });
});