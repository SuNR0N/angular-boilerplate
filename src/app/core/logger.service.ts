export class LoggerService {
    debug(message?: string) {
        console.debug(this.getTimestamp(), message);
    }

    error(message?: string) {
        console.error(this.getTimestamp(), message);
    }

    info(message?: string) {
        console.info(this.getTimestamp(), message);
    }

    log(message?: string) {
        console.log(this.getTimestamp(), message);
    }

    warn(message?: string) {
        console.warn(this.getTimestamp(), message);
    }

    private getTimestamp(): string {
        return '[' + new Date().toUTCString() + ']';
    }
}
