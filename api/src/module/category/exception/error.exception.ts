import { HttpException, HttpStatus } from '@nestjs/common';

export enum CategoryError {
    NOT_FOUND,
    EXIST,
}

export class CategoryErrorException extends HttpException {
    constructor(type: CategoryError) {

        let content = 'Category error';
        let code = HttpStatus.CONFLICT;

        switch (type) {
            case CategoryError.NOT_FOUND:
                content = 'Category not found';
                code = HttpStatus.NOT_FOUND;
                break;
            case CategoryError.EXIST:
                content = 'Category already exist';
                code = HttpStatus.CONFLICT;
                break;

            default:
                break;
        }
        super(content, code);
    }
}
