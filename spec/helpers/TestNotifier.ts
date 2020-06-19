import { Notifier } from '../../src/utils/foundry';

export class TestNotifier implements Notifier {
    info: (string: unknown) => void;
    warn: (string: unknown) => void;
    error: (string: unknown) => void;
}