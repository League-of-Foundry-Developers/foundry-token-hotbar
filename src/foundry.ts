export interface Notifier {
    info: (string) => void;
    warn: (string) => void;
    error: (string) => void;
}

export interface User {
    update(data: object): any;
    isGM: boolean;
}

export interface Identifiable {
    id: string;
}

export interface Macro {
    macro: Identifiable;
    slot: number;
}

export interface Flaggable extends Identifiable {
    getFlag(scope: string, key: string): any;
    setFlag(scope: string, key: string, data: any): Promise<Flaggable>;
    unsetFlag(scope: string, key: string): Promise<Flaggable>;
}

export interface IActor extends Flaggable { }

export interface IToken extends Flaggable {
    data: { actorLink: boolean };
    actor?: IActor;
}