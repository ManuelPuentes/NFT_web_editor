//
import { Injectable } from '@nestjs/common';
import { Collection } from '../entities/collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedRequest } from 'src/modules/common/interfaces/paginated-request.interface';
import { PaginatedResponse } from 'src/modules/common/interfaces/paginated-response.interface';

@Injectable()
export class GetCollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionsRepository: Repository<Collection>,
  ) {}

  async exec({
    limit,
    skip = 0,
    orderBy = 'id',
    orderType,
  }: PaginatedRequest<Collection>): Promise<
    PaginatedResponse<{ name: string }>
  > {
    const [collectionsEntities, count] = await this.collectionsRepository
      .createQueryBuilder('collection')
      .skip(skip)
      .take(limit)
      .orderBy(orderBy, orderType)
      .getManyAndCount();

    const collections = collectionsEntities.map(({ name }) => {
      return { name };
    });

    return {
      totalItems: count,
      items: collections,
      nextItem: skip + collections.length,
    };
  }
}
