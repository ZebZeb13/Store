import { Logger} from '@nestjs/common';
import dateFormat = require('dateformat');

const {createLogger, format, transports} = require('winston');
const { combine, timestamp, label, printf } = format;
// tslint:disable-next-line: no-var-requires
require('winston-daily-rotate-file');

export enum LOG_TYPE {
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    VERBOSE = 'verbose',
    FATAL = 'fatal',
}

const {
    ERROR_LOG, ERROR_LOG_FILE,
    LOG, LOG_FILE,
    WARN_LOG, WARN_LOG_FILE,
    VERBOSE_LOG, VERBOSE_LOG_FILE,
    DEBUG_LOG,
} = process.env;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]  ${message}`;
  });

const consoleFormat = printf(({ level, message, timestamp }) => {
    return `[${level}] - ${timestamp} - ${message}`;
  });

export class CustomLogger extends Logger {
    logger: any;

    constructor(directory: string = 'nestjs', name: string = 'nestjs') {
        super();
        const transport = new (transports.DailyRotateFile)({
            dirname: './logs/' + directory,
            filename: name + '-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        });

        transport.on('rotate', (oldFilename, newFilename) => {
            // do something fun
        });

        this.logger = createLogger({
            format: combine(
                label(name),
                timestamp(),
                myFormat,
              ),
            transports: [
                transport,
                // new transports.Console({
                //     format: format.combine(
                //       format.colorize({all: true}),
                //       label(name),
                //       timestamp({
                //           format: 'YYYY-MM-DD HH:mm:ss',
                //         }),
                //       consoleFormat,
                //     ),
                //   }),
            ],
        });
    }

    error(message: any, trace?: string, context?: string): void {
        if (ERROR_LOG || ERROR_LOG_FILE) {
            const { displayMessage, displayContext, logMessage } = this.createLog(message, context);
            if (ERROR_LOG) {
                super.error(displayMessage, trace, !context ? displayContext : context);
            }
            if (ERROR_LOG_FILE) {
                this.logger.log(LOG_TYPE.ERROR, logMessage);
            }
        }
    }

    log(message: any, context?: string): void {
        if (LOG || LOG_FILE) {
            const { displayMessage, displayContext, logMessage } = this.createLog(message, context);
            if (LOG) {
                super.log(displayMessage, !context ? displayContext : context);
            }
            if (LOG_FILE) {
                this.logger.log(LOG_TYPE.INFO, logMessage);
            }
        }
    }

    warn(message: any, context?: string): void {
        if (WARN_LOG || WARN_LOG_FILE) {
            const { displayMessage, displayContext, logMessage } = this.createLog(message, context);
            if (WARN_LOG) {
                super.warn(displayMessage, !context ? displayContext : context);
            }
            if (WARN_LOG_FILE) {
                this.logger.log(LOG_TYPE.WARN, logMessage);
            }
        }
    }

    verbose(message: any, context?: string): void {
        if (VERBOSE_LOG || VERBOSE_LOG_FILE) {
            const { displayMessage, displayContext, logMessage } = this.createLog(message, context);
            if (VERBOSE_LOG) {
                super.verbose(displayMessage, !context ? displayContext : context);
            }
            if (VERBOSE_LOG_FILE) {
                this.logger.log(LOG_TYPE.VERBOSE, logMessage);
            }
        }
    }

    debug(message: any, context?: string): void {
        if (DEBUG_LOG) {
            super.debug(message, context);
        }
    }

    parseMessage(message) {
        try {
            const json = JSON.parse(message);
            if (!json.type) {
                message = {
                    message,
                };
            } else {
                message = json;
            }
        } catch (error) {
            message = {
                message,
            };
        }
        return message;
    }

    createDisplayMessage(json) {
        let displayMesssage: string = '';
        let count = 0;
        Object.keys(json).forEach(key => {
            if (key !== 'type' && key !== 'subType') {
                if (count > 0) {
                    displayMesssage += ' | ';
                }
                displayMesssage += key + ': ' + JSON.stringify(json[key]);
                count++;
            }

        });
        return displayMesssage;
    }

    createLog(message, context) {
        const json = this.parseMessage(message);
        if (!json.type) {
            json.type = context;
        }
        let displayMessage = JSON.stringify(json);
        if (json.message && Object.keys(json).length === 2) {
            displayMessage = json.message;
        } else {
            displayMessage = this.createDisplayMessage(json);
        }

        return {
            displayMessage,
            displayContext: json.type + (json.subType ? (' ' + json.subType) : ''),
            logMessage: JSON.stringify(json),
        };
    }

    async addLog(type: LOG_TYPE, message, context) {

        // super.log(displayMessage, json.type);
        this.logger.addLog(type, JSON.stringify(message));
    }

}
