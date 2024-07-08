import { Controller, Put, Body, UseGuards, Param } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { SetAssetDeatilstDto } from '../dto/set-assets-details.dto';

import { SetAssetsDetailsService } from '../services/set-assets-details.service';
import { CollectionDto } from '../dto/collection.dto';
@Controller('collection')
export class SetAssetDetailsController {
  constructor(
    private readonly setAssetsDetailsService: SetAssetsDetailsService,
  ) {}
  @Put('asset-datails/:collection_name')
  @UseGuards(CollectionMustExistGuard)
  async execute(
    @Param() { collection_name }: CollectionDto,
    @Body() { assets_details }: SetAssetDeatilstDto,
  ) {
    await this.setAssetsDetailsService.exec({
      collection_name,
      assets_details,
    });
  }
}
