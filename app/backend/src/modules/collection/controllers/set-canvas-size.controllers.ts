import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { SetCanvasSizetDto } from '../dto/set-canvas-size.dto';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { SetCanvasSizeService } from '../services/set-canvas-size.service';
import { CollectionDto } from '../dto/collection.dto';

@Controller('collection')
export class SetCanvasSizeController {
  constructor(private readonly setCanvasSizeService: SetCanvasSizeService) {}
  @Put('canvas/:collection_name')
  @UseGuards(CollectionMustExistGuard)
  async execute(
    @Param() { collection_name }: CollectionDto,
    @Body() { size }: SetCanvasSizetDto,
  ) {
    await this.setCanvasSizeService.exec({ collection_name, size });
  }
}
