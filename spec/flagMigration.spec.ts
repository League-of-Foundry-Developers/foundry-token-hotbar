import 'jasmine';
import { Migration, DataFlaggable } from '../src/utils/migration';
import { OldHotbarData, HotbarData } from '../src/flags/hotbarFlags';
import { TestFlaggable } from './helpers/TestToken';
import { CONSTANTS } from '../src/utils/constants';

describe('migration.translateDataStructure', function () {

    it('does not try to migrate new data (#21)', async function () {
        const user = new TestFlaggable('user-1');
        const newHotbarData: HotbarData = {
            '36CpODC5K9FprGth': { 41:'qVDGuGXCAXCOYw7R',43:'S4P0BBEvbdELIjwU',45:'CLX1soaLSxFDAAV8' },
            'jUsZENMpwCBFw2Z1': { 41:'qVDGuGXCAXCOYw7R',43:'S4P0BBEvbdELIjwU',45:'CLX1soaLSxFDAAV8' },
            'bAlcTgzHf0YlnlMz': { 41:'qVDGuGXCAXCOYw7R',43:'S4P0BBEvbdELIjwU',45:'CLX1soaLSxFDAAV8' }
        };
        user.setFlag('TokenHotbar', 'hotbar-data', newHotbarData);
        spyOn(user, 'setFlag');
        spyOn(user, 'unsetFlag');

        await new Migration([ user ]).migrate();
        expect(user.setFlag).not.toHaveBeenCalled();
        expect(user.unsetFlag).not.toHaveBeenCalled();
    });

    it('handles old data properly (#20)', async function () {
        const user = new TestFlaggable('user-1');
        const oldHotbarData: OldHotbarData = {'jUsZENMpwCBFw2Z1':[ {'slot':41,'id':'qVDGuGXCAXCOYw7R'},{'slot':43,'id':'S4P0BBEvbdELIjwU'},{'slot':45,'id':'CLX1soaLSxFDAAV8'} ],'36CpODC5K9FprGth':[ {'slot':41,'id':'qVDGuGXCAXCOYw7R'},{'slot':43,'id':'S4P0BBEvbdELIjwU'},{'slot':45,'id':'CLX1soaLSxFDAAV8'} ],'bAlcTgzHf0YlnlMz':[ {'slot':41,'id':'qVDGuGXCAXCOYw7R'},{'slot':43,'id':'S4P0BBEvbdELIjwU'},{'slot':45,'id':'CLX1soaLSxFDAAV8'} ]};
        user.setFlag('world', 'TokenHotbar', <any>oldHotbarData);
        const expectedData = {
            '36CpODC5K9FprGth': { 41:'qVDGuGXCAXCOYw7R',43:'S4P0BBEvbdELIjwU',45:'CLX1soaLSxFDAAV8' },
            'jUsZENMpwCBFw2Z1': { 41:'qVDGuGXCAXCOYw7R',43:'S4P0BBEvbdELIjwU',45:'CLX1soaLSxFDAAV8' },
            'bAlcTgzHf0YlnlMz': { 41:'qVDGuGXCAXCOYw7R',43:'S4P0BBEvbdELIjwU',45:'CLX1soaLSxFDAAV8' }
        };

        await new Migration([ user ]).migrate();
        console.log(user.getFlag('TokenHotbar', 'hotbar-data'));
        expect(user.getFlag('TokenHotbar', 'hotbar-data')).toEqual(expectedData);
    });

    it('handles empty old data properly (#22)', async function () {
        const user = new TestFlaggable('user-1');
        const oldHotbarData = {'jUsZENMpwCBFw2Z1': {}};
        user.setFlag('world', 'TokenHotbar', <any>oldHotbarData);

        await new Migration([ user ]).migrate();
        console.log(user.getFlag('TokenHotbar', 'hotbar-data'));
        expect(user.getFlag('TokenHotbar', 'hotbar-data')).toEqual({});
    });

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

        for(const id in oldData) {
            const actualData = migration.translateDataStructure(oldData[id]);
            expect(actualData).toEqual(expectedData[id]);
        }
    });

    it('unsets the HotbarData flag on world', async function () {
        const oldData: OldHotbarData = {
            'token-1': [ { slot: 1, id: '345b' }, { slot: 41, id: 'jkl567'} ],
            'token-2': [ { slot: 1, id: '3k46jb' }, { slot: 23, id: '7s0'} ],
        };

        const flaggable = <DataFlaggable><unknown>new TestFlaggable('some-token');
        flaggable.data = {
            flags: { world: { [CONSTANTS.module.name]: oldData } }
        };

        spyOn(flaggable, 'unsetFlag');
        spyOn(flaggable, 'setFlag');
    
        const migrator = new Migration([ flaggable ]);
        const errors = await migrator.migrate();
        errors.map(e => console.error(e));

        const translatedData = Object.keys(oldData).reduce<HotbarData>( (acc, id: string) => (acc[id] = migrator.translateDataStructure(oldData[id]), acc), {});

        expect(errors.length).toEqual(0);
        for(const id of Object.keys(oldData)) {
            expect(flaggable.unsetFlag).toHaveBeenCalledWith(CONSTANTS.module.name, id);
        }
        expect(flaggable.unsetFlag).toHaveBeenCalledWith('world', CONSTANTS.module.name);

        expect(flaggable.setFlag).toHaveBeenCalledTimes(1);
        expect(flaggable.setFlag).toHaveBeenCalledWith(CONSTANTS.module.name, 'hotbar-data', translatedData);
    });

    it('unsets the HotbarData flag on the entity', async function () {
        const oldData: OldHotbarData = {
            'token-1': [ { slot: 1, id: '345b' }, { slot: 41, id: 'jkl567'} ],
            'token-2': [ { slot: 1, id: '3k46jb' }, { slot: 23, id: '7s0'} ],
        };

        const flaggable = <DataFlaggable><unknown>new TestFlaggable('some-token');
        flaggable.data = {
            flags: { [CONSTANTS.module.name]: { ['hotbar-data']: oldData }  }
        };

        spyOn(flaggable, 'unsetFlag');
        spyOn(flaggable, 'setFlag');
    
        const migrator = new Migration([ flaggable ]);
        const errors = await migrator.migrate();
        errors.map(e => console.error(e));

        const translatedData = Object.keys(oldData).reduce<HotbarData>( (acc, id: string) => (acc[id] = migrator.translateDataStructure(oldData[id]), acc), {});

        expect(errors.length).toEqual(0);
        for(const id of Object.keys(oldData)) {
            expect(flaggable.unsetFlag).toHaveBeenCalledWith(CONSTANTS.module.name, id);
        }
        expect(flaggable.unsetFlag).toHaveBeenCalledWith('world', CONSTANTS.module.name);

        expect(flaggable.setFlag).toHaveBeenCalledTimes(1);
        expect(flaggable.setFlag).toHaveBeenCalledWith(CONSTANTS.module.name, 'hotbar-data', translatedData);
    });
});