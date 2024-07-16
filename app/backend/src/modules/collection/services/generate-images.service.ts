import { Queue } from 'bull';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Collection } from '../entities/collection.entity';
import { GenerationStatus } from '../entities/enums/generation-status.enum';
import { CollectionGenerateImagesProccessActiveException } from '../exceptions/collection-generate-image-proccess-active.exception';
import { InjectImagesGeneratorQueue } from 'src/modules/queues/processors/generate-imgs.processor';

@Injectable()
export class GenerateImagesService {
  constructor(
    @InjectImagesGeneratorQueue() private imagesGeneratorQueue: Queue,
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  async exec({
    collection_name,
    amount,
  }: {
    collection_name: string;
    amount: number;
  }): Promise<void> {
    await this.updateCollectionStatus({ collection_name });

    this.imagesGeneratorQueue.add('GENERATE_IMAGES', {
      collection_name,
      amount,
    });
  }

  private async updateCollectionStatus({
    collection_name,
  }: {
    collection_name: string;
  }) {
    const collection = await this.collectionRepository.findOne({
      where: {
        name: collection_name,
        status: GenerationStatus.ACTIVE,
      },
    });

    if (collection) {
      throw new CollectionGenerateImagesProccessActiveException();
    }

    await this.collectionRepository.update(
      { name: collection_name },
      { status: GenerationStatus.ACTIVE },
    );
  }
}
