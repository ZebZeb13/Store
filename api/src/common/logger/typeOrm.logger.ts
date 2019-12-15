// import { Logger } from 'typeorm';
import dateFormat = require('dateformat');
import fs = require('fs');
// import { Logger as NestLogger } from '@nestjs/common';
import { CustomLogger, LOG_TYPE } from './logger';

export class TypeOrmLogger {
    logger: CustomLogger;
    contextString: string;
    constructor() {
        this.logger = new CustomLogger('typeOrm', 'typeOrm');
        this.contextString = 'TypeOrm';
    }

    logQuery(query: string, parameters?: any[], queryRunner?: import('typeorm').QueryRunner) {
        if (process.env.TYPEORM_QUERY_LOG) {
            const data = { type: this.contextString + 'Query', query, parameters };
            this.logger.log(LOG_TYPE.INFO, JSON.stringify(data));
        }
    }
    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: import('typeorm').QueryRunner) {
        if (process.env.TYPEORM_QUERY_ERROR_LOG) {
            const data = { type: this.contextString + 'QueryError', error, query, parameters };
            this.logger.log(LOG_TYPE.ERROR, JSON.stringify(data));
        }
    }
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: import('typeorm').QueryRunner) {
        if (process.env.TYPEORM_QUERY_SLOW_LOG) {
            const data = { type: this.contextString + 'QuerySlow', query, parameters, time };
            this.logger.log(LOG_TYPE.WARN, JSON.stringify(data));
        }
    }
    logSchemaBuild(message: string, queryRunner?: import('typeorm').QueryRunner) {
        if (process.env.TYPEORM_QUERY_SCHEMA_BUILD_LOG) {
            const data = { type: this.contextString + 'SchemaBuild', message };
            this.logger.log(LOG_TYPE.INFO, JSON.stringify(data));
        }
    }
    logMigration(message: string, queryRunner?: import('typeorm').QueryRunner) {
        if (process.env.TYPEORM_QUERY_MIGRATION_LOG) {
            const data = { type: this.contextString + 'Migration', message };
            this.logger.log(LOG_TYPE.WARN, JSON.stringify(data));
        }
    }
    log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: import('typeorm').QueryRunner) {
        if (process.env.TYPEORM_LOG) {
            const data = { type: this.contextString + 'Log', message };
            switch (level) {
                case 'log':
                    this.logger.log(LOG_TYPE.INFO, JSON.stringify(data));
                    break;
                case 'info':
                    this.logger.log(LOG_TYPE.INFO, JSON.stringify(data));
                    break;

                case 'warn':
                    this.logger.log(LOG_TYPE.WARN, JSON.stringify(data));
                    break;

                default:
                    break;
            }
        }
    }
}
