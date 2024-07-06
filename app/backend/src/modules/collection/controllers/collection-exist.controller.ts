import { Controller, Get, UseGuards, Query } from '@nestjs/common';

import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { CollectionDto } from '../dto/collection.dto';
@Controller('collection')
export class ExistController {
  constructor() {}
  @Get('exist')
  @UseGuards(CollectionMustExistGuard)
  async execute(@Query() _dto: CollectionDto) {}
}
