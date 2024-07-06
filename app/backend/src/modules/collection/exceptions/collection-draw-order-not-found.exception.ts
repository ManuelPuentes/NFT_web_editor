import { HttpException, HttpStatus } from '@nestjs/common';

export class CollectionDrawOrderNotFoundException extends HttpException {
  constructor() {
    super(`collection draw order not found`, HttpStatus.CONFLICT);
  }
}
