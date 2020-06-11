export interface Notifier {
    info: (string) => void;
    warn: (string) => void;
    error: (string) => void;
}