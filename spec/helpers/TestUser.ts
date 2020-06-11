import { IUser } from "../../src/tokenHotbar";

export class TestUser implements IUser {
    update(data: object) {
        return Promise.resolve();
    }
    isGM: boolean = true;
}