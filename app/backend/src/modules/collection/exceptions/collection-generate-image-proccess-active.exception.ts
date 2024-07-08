import { HttpException, HttpStatus } from '@nestjs/common';

export class CollectionGenerateImagesProccessActiveException extends HttpException {
  constructor() {
    super(
      `collection currently is generating a batcvh of images, pls wait until this proccess ends`,
      HttpStatus.CONFLICT,
    );
  }
}
