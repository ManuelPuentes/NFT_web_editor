import { HttpException, HttpStatus } from '@nestjs/common';

export class CollectionAlreadyExistsException extends HttpException {
  constructor() {
    super('collection already exist', HttpStatus.CONFLICT);
  }
}
