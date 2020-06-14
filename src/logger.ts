export interface Logger {
    error(...message: unknown[]): void;
    warn(...message: unknown[]): void;
    info(...message: unknown[]): void;
    debug(...message: unknown[]): void;
}

export class ConsoleLogger {

    constructor(private showDebug: boolean = false) { }

    static init(): void {
        window['TokenHotbar'] = { debug: false };
    }

    error(...message: unknown[]): void {
        console.error.apply(null, message);
    }

    warn(...message: unknown[]): void {
        console.warn.apply(null, message);
    }

    info(...message: unknown[]): void {
        console.info.apply(null, message);
    }

    debug(...message: unknown[]): void {
        if (this.showDebug)
            console.debug.apply(null, ...message);
    }
}