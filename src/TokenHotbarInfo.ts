import { CONSTANTS } from './constants';

export class TokenHotbarInfo {
    version: string;
    debug = false;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.version = (<any>game).modules.get(CONSTANTS.moduleName).data.name;
    }
}