import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLogger } from '../logger/logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const logger = new CustomLogger('nestjs', 'http-exception');
    let subType: string = '';
    if (host.getArgByIndex(3) && host.getArgByIndex(3).fieldName) {
        subType = host.getArgByIndex(3).fieldName;
    }
    const data = {
        type: 'HttpException',
        subType,
        status,
        message: exception.message,
        data: response,
    };
    try {
        logger.error(JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
  }
}
