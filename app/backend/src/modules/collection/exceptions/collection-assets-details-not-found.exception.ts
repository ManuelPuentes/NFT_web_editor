import { HttpException, HttpStatus } from '@nestjs/common';

export class CollectionAssetsDetailsNotFoundException extends HttpException {
    constructor() {
        super(`collection assets details files not found`, HttpStatus.CONFLICT);
    }
}
