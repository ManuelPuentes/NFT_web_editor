import { Body, Controller, Put, Query, UseGuards } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { SetDrawOrderService } from '../services/set-draw-order.service';
import { CollectionNametDto } from '../dto/collection-name.dto';
import { SetDrawOrderDto } from '../dto/set-draw-order.dto';
@Controller('collection')
export class SetDrawOrderController {
    constructor(private readonly setDrawOrderService: SetDrawOrderService) { }
    @Put('draw-order')
    @UseGuards(CollectionMustExistGuard)
    async execute(
        @Query() { name }: CollectionNametDto,
        @Body() { draw_order }: SetDrawOrderDto
    ) {
        return {
            data: await this.setDrawOrderService.exec({
                collection_name: name,
                draw_order
            })
        };
    }
}