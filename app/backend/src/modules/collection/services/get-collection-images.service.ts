import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderType } from 'src/modules/common/enums/order-type.enum';

import { Image } from '../entities/image.entity';
import { Collection } from '../entities/collection.entity';

import { PaginatedRequest } from 'src/modules/common/interfaces/paginated-request.interface';
import { PaginatedResponse } from 'src/modules/common/interfaces/paginated-response.interface';

@Injectable()
export class GetCollectionImagesService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionsRepository: Repository<Collection>,

    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,
  ) {}

  async exec({
    limit = 5,
    skip = 0,
    orderBy = 'id',
    orderType,
    collection_name,
  }: GetCollectionsImages): Promise<
    PaginatedResponse<{ url: string; metadata: any }>
  > {
    const { id: collection_id } =
      await this.collectionsRepository.findOneByOrFail({
        name: collection_name,
      });
    const [imagesEntitiies, count] = await this.imagesRepository
      .createQueryBuilder('image')
      .where('image.collection_id = :collection_id', { collection_id })
      .skip(skip)
      .take(limit)
      .orderBy(orderBy, orderType)
      .getManyAndCount();
    const images = imagesEntitiies.map(({ url, metadata }) => {
      return {
        url,
        metadata: JSON.parse(metadata),
      };
    });
    return {
      totalItems: count,
      items: images,
      nextItem: skip + images.length,
    };
  }
}

export class GetCollectionsImages implements PaginatedRequest<Collection> {
  skip?: number;
  limit?: number;
  orderBy?: keyof Collection;
  orderType?: OrderType;
  collection_name: string;
}
