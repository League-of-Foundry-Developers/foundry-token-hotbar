import { Settings } from './settings';

export interface Logger {
    error(...message: unknown[]): void;
    warn(...message: unknown[]): void;
    info(...message: unknown[]): void;
    debug(...message: unknown[]): void;
}

export class ConsoleLogger {

    constructor(private settings: Settings) { }

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
        if (this.settings.debugMode)
            console.debug.apply(null, message);
    }
}