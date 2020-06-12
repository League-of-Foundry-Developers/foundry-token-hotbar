export class Logger {
    error(...message: any[]) {
        console.error.apply(null, arguments);
    }

    warn(...message: any[]) {
        console.warn.apply(null, arguments);
    }

    info(...message: any[]) {
        console.info.apply(null, arguments);
    }

    debug(...message: any[]) {
        if ((<any>window).TokenHotbar?.debug)
            console.debug.apply(null, arguments);
    }
}