import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidAssetsException extends HttpException {
  constructor() {
    super('provided zip file is invalid', HttpStatus.BAD_REQUEST);
  }
}
