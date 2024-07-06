import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { GetDrawOrderService } from '../services/get-draw-order.service';
import { GetDrawOrdertDto } from '../dto/get-draw-order.dto';
@Controller('collection')
export class GetDrawOrderController {
  constructor(private readonly getDrawOrderService: GetDrawOrderService) {}
  @Get('draw-order')
  @UseGuards(CollectionMustExistGuard)
  async execute(@Query() { collection_name }: GetDrawOrdertDto) {
    return {
      data: await this.getDrawOrderService.exec({ collection_name }),
    };
  }
}
