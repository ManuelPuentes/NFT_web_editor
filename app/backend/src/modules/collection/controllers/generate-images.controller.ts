import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { GenerateImagesService } from '../services/generate-images.service';
import { GenerateImagesDto } from '../dto/generate-images.dto';
import { CollectionDto } from '../dto/collection.dto';

@Controller('collection')
export class GenerateImagesController {
  constructor(private readonly generateImagesService: GenerateImagesService) {}

  @Post('generate-images/:collection_name')
  @UseGuards(CollectionMustExistGuard)
  async execute(
    @Param() { collection_name }: CollectionDto,
    @Body() { amount }: GenerateImagesDto,
  ) {
    await this.generateImagesService.exec({ collection_name, amount });
  }
}
