import { Notifier } from "../../src/notifier";

export class TestNotifier implements Notifier {
    info: (string: any) => void;
    warn: (string: any) => void;
    error: (string: any) => void;
}