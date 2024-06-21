import { Controller, Get, UseGuards, Query } from '@nestjs/common';

import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
@Controller('collection')
export class ExistController {
    constructor() { }
    @Get('exist')
    @UseGuards(CollectionMustExistGuard)
    async execute(@Query() { name }: { name: string }) {}
}


