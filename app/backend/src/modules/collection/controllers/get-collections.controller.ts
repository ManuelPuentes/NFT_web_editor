import { Controller, Get, Query } from '@nestjs/common';
import { GetCollectionsService } from '../services/get-collections.services';
import { GetCollectionsDTO } from '../dto/get-collections.dto';

@Controller('collection')
export class GetCollectionsController {
    constructor(private readonly listCollectionsService: GetCollectionsService) { }

    @Get()
    async execute(
        @Query()
        { limit, orderBy, orderType, skip }: GetCollectionsDTO,
    ) {
        return {
            data: await this.listCollectionsService.exec({ limit, orderBy, orderType, skip })
        };
    }

}

