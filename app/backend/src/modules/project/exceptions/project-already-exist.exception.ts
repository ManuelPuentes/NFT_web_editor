import { HttpException, HttpStatus } from '@nestjs/common';

export class ProjectAlreadyExistsException extends HttpException{
  constructor() {
    super('project already exist', HttpStatus. CONFLICT);
  }
}
