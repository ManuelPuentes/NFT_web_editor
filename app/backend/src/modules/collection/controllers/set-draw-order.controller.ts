import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { SetDrawOrderService } from '../services/set-draw-order.service';
import { SetDrawOrderDto } from '../dto/set-draw-order.dto';
@Controller('collection')
export class SetDrawOrderController {
  constructor(private readonly setDrawOrderService: SetDrawOrderService) {}
  @Put('draw-order')
  @UseGuards(CollectionMustExistGuard)
  async execute(@Body() { draw_order, collection_name }: SetDrawOrderDto) {
    return {
      data: await this.setDrawOrderService.exec({
        collection_name,
        draw_order,
      }),
    };
  }
}
