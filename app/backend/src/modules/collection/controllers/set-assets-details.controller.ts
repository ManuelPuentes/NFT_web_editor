import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { SetAssetDeatilstDto } from '../dto/set-assets-details.dto';

import { SetAssetsDetailsService } from '../services/set-assets-details.service';
@Controller('collection')
export class SetAssetDetailsController {
  constructor(
    private readonly setAssetsDetailsService: SetAssetsDetailsService,
  ) {}
  @Put('asset-datails')
  @UseGuards(CollectionMustExistGuard)
  async execute(
    @Body() { assets_details, collection_name }: SetAssetDeatilstDto,
  ) {
    await this.setAssetsDetailsService.exec({
      collection_name,
      assets_details,
    });
  }
}
