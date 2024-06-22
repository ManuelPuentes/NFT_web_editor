import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidDrawOrderException extends HttpException {
    constructor() {
        super(`provided new draw order is invalid`, HttpStatus.CONFLICT);
    }
}
