import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { SetDrawOrderService } from '../services/set-draw-order.service';
import { SetDrawOrderDto } from '../dto/set-draw-order.dto';
import { CollectionDto } from '../dto/collection.dto';
@Controller('collection')
export class SetDrawOrderController {
  constructor(private readonly setDrawOrderService: SetDrawOrderService) {}
  @Put('draw_order/:collection_name')
  @UseGuards(CollectionMustExistGuard)
  async execute(
    @Param() { collection_name }: CollectionDto,
    @Body() { draw_order }: SetDrawOrderDto,
  ) {
    await this.setDrawOrderService.exec({
      collection_name,
      draw_order,
    });
  }
}
