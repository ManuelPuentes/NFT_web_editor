import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { GetDrawOrderService } from '../services/get-draw-order.service';
import { CollectionDto } from '../dto/collection.dto';
@Controller('collection')
export class GetDrawOrderController {
  constructor(private readonly getDrawOrderService: GetDrawOrderService) {}
  @Get('draw_order/:collection_name')
  @UseGuards(CollectionMustExistGuard)
  async execute(@Param() { collection_name }: CollectionDto) {
    return {
      data: await this.getDrawOrderService.exec({ collection_name }),
    };
  }
}
