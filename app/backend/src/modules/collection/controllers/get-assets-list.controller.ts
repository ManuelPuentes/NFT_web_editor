import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { CollectionDto } from '../dto/collection.dto';

import { GetAssetsListService } from '../services/get-asset-list.service';
@Controller('collection')
export class GetAssetsListController {
  constructor(private readonly getAssetsListService: GetAssetsListService) {}
  @Get('assets_list/:collection_name')
  @UseGuards(CollectionMustExistGuard)
  async execute(@Param() { collection_name }: CollectionDto) {
    return {
      data: this.getAssetsListService.exec({ collection_name }),
    };
  }
}
