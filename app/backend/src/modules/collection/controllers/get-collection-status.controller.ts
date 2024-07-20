import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { CollectionDto } from '../dto/collection.dto';
import { GetCollectionStatusService } from '../services/get-collection-status.service';
@Controller('collection')
export class GetStatusController {
    constructor(
        private readonly getCollectionStatusService: GetCollectionStatusService,
    ) { }
    @Get('status/:collection_name')
    @UseGuards(CollectionMustExistGuard)
    async execute(@Param() { collection_name }: CollectionDto) {
        return {
            data: await this.getCollectionStatusService.exec({ collection_name }),
        };
    }
}
