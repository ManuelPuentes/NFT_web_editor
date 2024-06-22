import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { GetDrawOrderService } from '../services/get-draw-order.service';
import { CollectionNametDto } from '../dto/collection-name.dto';
@Controller('collection')
export class GetDrawOrderController {
    constructor(private readonly getDrawOrderService: GetDrawOrderService) { }
    @Get('draw-order')
    @UseGuards(CollectionMustExistGuard)
    async execute(@Query() { name }: CollectionNametDto) {
        return {
            data: await this.getDrawOrderService.exec({ collection_name: name })
        };
    }
}