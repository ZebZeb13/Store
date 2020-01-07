import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger as NestLogger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomLogger } from '../logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => {
                    const time = Date.now() - now;

                    const logger = new CustomLogger('nestjs', 'time');
                    const data = {
                        type: 'Time',
                        subType: context.getClass().name,
                        fonction: context.getHandler().name,
                        time: time + 'ms',
                    }
                    if (time > (process.env.SLOW_EXCUTION_LOG_TIME ? Number(process.env.SLOW_EXCUTION_LOG_TIME) : 150)) {
                        logger.warn(JSON.stringify(data));
                    } else {
                        logger.log(JSON.stringify(data));
                    }
                }),
            );
    }
}
