import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidProjecAssetsException extends HttpException{
  constructor() {
    super('provided zip file is invalid', HttpStatus.BAD_REQUEST);
  }
}
