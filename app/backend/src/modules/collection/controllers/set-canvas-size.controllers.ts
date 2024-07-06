import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { SetCanvasSizetDto } from '../dto/set-canvas-size.dto';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { SetCanvasSizeService } from '../services/set-canvas-size.service';

@Controller('collection')
export class SetCanvasSizeController {
  constructor(private readonly setCanvasSizeService: SetCanvasSizeService) {}
  @Put('canvas')
  @UseGuards(CollectionMustExistGuard)
  async execute(@Body() { size, collection_name }: SetCanvasSizetDto) {
    return {
      data: await this.setCanvasSizeService.exec({ collection_name, size }),
    };
  }
}
