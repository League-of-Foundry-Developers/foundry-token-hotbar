import { Notifier } from '../../src/foundry';

export class TestNotifier implements Notifier {
    info: (string: unknown) => void;
    warn: (string: unknown) => void;
    error: (string: unknown) => void;
}