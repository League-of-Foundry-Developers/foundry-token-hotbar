export class TestClientSettings {
    constructor(private settings: {[key: string]: unknown }) { }
    public get(scope: string, key: string): unknown {
        return this.settings[key];
    }
}
