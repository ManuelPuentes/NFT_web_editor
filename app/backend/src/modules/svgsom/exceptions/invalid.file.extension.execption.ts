import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidFileExtensionException extends HttpException {
  constructor() {
    super('provided assets must be SVG', HttpStatus.CONFLICT);
  }
}
