import { Logger } from "@nestjs/common";


export class NestJsLogger extends Logger {

    constructor() {
        super();
    }

    error(message: any, trace?: string, context?: string): void {
        // super.error(message, trace, context);
    }

    log(message: any, context?: string): void {
        console.log(message)
        // super.log(message, context);
    }

    warn(message: any, context?: string): void {
        // super.warn(message, context);
    }

    verbose(message: any, context?: string): void {
        // super.verbose(message, context);
    }

    debug(message: any, context?: string): void {
        // super.debug(message, context);
    }

}
