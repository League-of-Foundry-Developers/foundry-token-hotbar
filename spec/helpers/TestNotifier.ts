import { Notifier } from "../../src/foundry";

export class TestNotifier implements Notifier {
    info: (string: any) => void;
    warn: (string: any) => void;
    error: (string: any) => void;
}