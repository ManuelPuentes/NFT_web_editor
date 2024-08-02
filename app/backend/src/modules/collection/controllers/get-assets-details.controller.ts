import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetAssetsDetailsService } from '../services/get-assets-details.service';

import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { CollectionDto } from '../dto/collection.dto';
@Controller('collection')
export class GetAssetDetailsController {
  constructor(
    private readonly getAssetsDetailsService: GetAssetsDetailsService,
  ) {}
  @Get('asset_details/:collection_name')
  @UseGuards(CollectionMustExistGuard)
  async execute(@Param() { collection_name }: CollectionDto) {
    return {
      data: await this.getAssetsDetailsService.exec({ collection_name }),
    };
  }
}
