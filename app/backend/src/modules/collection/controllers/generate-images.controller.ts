import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { GenerateImagesService } from '../services/generate-images.service';
import { GenerateImagesDto } from '../dto/generate-images.dto';

@Controller('collection')
export class GenerateImagesController {
  constructor(private readonly generateImagesService: GenerateImagesService) {}

  @Post('generate-images')
  @UseGuards(CollectionMustExistGuard)
  async execute(@Body() { collection_name, amount }: GenerateImagesDto) {
    await this.generateImagesService.exec({ collection_name, amount });
  }
}
