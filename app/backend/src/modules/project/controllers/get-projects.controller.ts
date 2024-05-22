import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';

import { GetProjectsService } from '../services/get-projects.services';
import { GetProjectsDTO } from '../dto/get-projects.dto';


@Controller('project')
export class GetProjectsController {
    constructor(private readonly listProjectsService: GetProjectsService) { }

    @Get()
    async execute(
        @Query()
        { limit, orderBy, orderType, skip }: GetProjectsDTO,
    ) {
        return await this.listProjectsService.exec({ limit, orderBy, orderType, skip });
    }

}

