import { HttpException, HttpStatus } from '@nestjs/common';

export class CollectionDoesNotExistException extends HttpException {
  constructor(collection_name: string) {
    super(
      ` collection: "${collection_name}" does not exist `,
      HttpStatus.BAD_REQUEST,
    );
  }
}
