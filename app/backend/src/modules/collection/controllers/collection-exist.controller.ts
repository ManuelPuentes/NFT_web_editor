import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { CollectionDto } from '../dto/collection.dto';
@Controller('collection')
export class ExistController {
  constructor() {}
  @Get('exist/:collection_name')
  @UseGuards(CollectionMustExistGuard)
  async execute(@Param() {}: CollectionDto) {}
}
