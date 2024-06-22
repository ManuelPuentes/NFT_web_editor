import { Controller, Put, Body, Get, UseGuards, Query } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { SetAssetDeatilstDto } from '../dto/set-assets-details.dto';

import { SetAssetsDetailsService } from '../services/set-assets-details.service';
import { CollectionNametDto } from '../dto/collection-name.dto';
@Controller('collection')
export class SetAssetDetailsController {
    constructor(
        private readonly setAssetsDetailsService: SetAssetsDetailsService
    ) { }
    @Put('asset-datails')
    @UseGuards(CollectionMustExistGuard)
    async execute(
        @Body() { assets_details }: SetAssetDeatilstDto,
        @Query() { name }: CollectionNametDto
    ) {
        await this.setAssetsDetailsService.exec({ name, assets_details });
    }
}