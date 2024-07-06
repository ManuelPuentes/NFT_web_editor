import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetAssetsDetailsService } from '../services/get-assets-details.service';

import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { GetAssetDeatilstDto } from '../dto/get-assets-details.dto';
@Controller('collection')
export class GetAssetDetailsController {
  constructor(
    private readonly getAssetsDetailsService: GetAssetsDetailsService,
  ) {}
  @Get('asset-details')
  @UseGuards(CollectionMustExistGuard)
  async execute(@Query() { collection_name }: GetAssetDeatilstDto) {
    return {
      data: await this.getAssetsDetailsService.exec({ collection_name }),
    };
  }
}
