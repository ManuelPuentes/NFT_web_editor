import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { SetAssetDeatilstDto } from '../dto/set-assets-details.dto';

import { SetAssetsDetailsService } from '../services/set-assets-details.service';
@Controller('collection')
export class SetAssetDetailsController {
    constructor(
        private readonly setAssetsDetailsService: SetAssetsDetailsService
    ) { }
    @Put('asset-data')
    @UseGuards(CollectionMustExistGuard)
    async execute(@Body() { assets_details, name }: SetAssetDeatilstDto) {
        await this.setAssetsDetailsService.exec({ name, assets_details });
    }
}