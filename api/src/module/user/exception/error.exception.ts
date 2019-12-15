import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export enum UserError {
    NOT_FOUND = 'NOT_FOUND',
    EXIST = 'EXIST',
    LOGIN = 'LOGIN',
}

export class UserErrorException extends HttpException {
    constructor(type: UserError) {

        let content = 'User error';
        let code = HttpStatus.CONFLICT;
        switch (type) {
            case UserError.NOT_FOUND:
                content = 'User not found';
                code = HttpStatus.NOT_FOUND;
                break;

            case UserError.EXIST:
                content = 'User already exist';
                code = HttpStatus.CONFLICT;
                break;

            case UserError.LOGIN:
                content = 'Invalid username/password';
                code = HttpStatus.CONFLICT;
                break;

            default:
                break;
        }
        super(content, code);
    }
}
