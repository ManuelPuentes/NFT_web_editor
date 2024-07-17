import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { GetCollectionsDTO } from '../dto/get-collections.dto';
import { CollectionDto } from '../dto/collection.dto';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { GetCollectionImagesService } from '../services/get-collection-images.service';

@Controller('collection')
export class GetCollectionImagesController {
  constructor(
    private readonly getCollectionImagesService: GetCollectionImagesService,
  ) {}

  @Get('images/:collection_name')
  @UseGuards(CollectionMustExistGuard)
  async execute(
    @Query() { limit, orderBy, orderType, skip }: GetCollectionsDTO,
    @Param() { collection_name }: CollectionDto,
  ) {
    return {
      data: await this.getCollectionImagesService.exec({
        limit,
        orderBy,
        orderType,
        skip,
        collection_name,
      }),
    };
  }
}
