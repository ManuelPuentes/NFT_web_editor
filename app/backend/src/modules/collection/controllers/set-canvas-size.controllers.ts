import { Body, Controller, Put, Query, UseGuards } from '@nestjs/common';
import { CollectionNametDto } from '../dto/collection-name.dto';
import { SetCanvasSizetDto } from '../dto/set-canvas-size.dto';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { SetCanvasSizeService } from '../services/set-canvas-size.service';


@Controller('collection')
export class SetCanvasSizeController {
    constructor(private readonly setCanvasSizeService: SetCanvasSizeService) { }
    @Put('canvas')
    @UseGuards(CollectionMustExistGuard)
    async execute(
        @Query() { name }: CollectionNametDto,
        @Body() { size }: SetCanvasSizetDto,
    ) {
        return {
            data: await this.setCanvasSizeService.exec({ name, size })
        };
    }
}