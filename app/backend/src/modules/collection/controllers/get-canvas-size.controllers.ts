import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { GetCanvasSizeService } from '../services/get-canvas-size.service';
import { CollectionDto } from '../dto/collection.dto';
@Controller('collection')
export class GetCanvasSizeController {
  constructor(private readonly getCanvasSizeService: GetCanvasSizeService) {}
  @Get('canvas/:collection_name')
  @UseGuards(CollectionMustExistGuard)
  async execute(@Param() { collection_name }: CollectionDto) {
    return {
      data: await this.getCanvasSizeService.exec({ collection_name }),
    };
  }
}
