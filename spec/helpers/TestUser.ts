import { User } from "../../src/foundry";

export class TestUser implements User {
    update(_: object) {
        return Promise.resolve(this);
    }

    isGM: boolean = true;
}