import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from '../entities/collection.entity';
import { Repository } from 'typeorm';
import { GenerationStatus } from '../entities/enums/generation-status.enum';

@Injectable()
export class GetCollectionStatusService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionsRepository: Repository<Collection>,
  ) {}

  async exec({
    collection_name,
  }: {
    collection_name: string;
  }): Promise<GenerationStatus> {
    const collection = await this.collectionsRepository.findOneByOrFail({
      name: collection_name,
    });

    return collection.status;
  }
}
