import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { GetCanvasSizeService } from '../services/get-canvas-size.service';
import { GetCanvasSizetDto } from '../dto/get-canvas-size.dto';
@Controller('collection')
export class GetCanvasSizeController {
  constructor(private readonly getCanvasSizeService: GetCanvasSizeService) {}
  @Get('canvas')
  @UseGuards(CollectionMustExistGuard)
  async execute(@Query() { collection_name }: GetCanvasSizetDto) {
    return {
      data: await this.getCanvasSizeService.exec({ collection_name }),
    };
  }
}
