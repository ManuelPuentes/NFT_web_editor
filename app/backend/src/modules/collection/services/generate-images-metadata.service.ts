import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../entities/image.entity';
import { Collection } from '../entities/collection.entity';
import { GetAssetsListService } from './get-asset-list.service';
import { CryptoService } from 'src/modules/crypto/services/crypto.service';

@Injectable()
export class GenerateImagesMetadataService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,
    @InjectRepository(Collection)
    private readonly collectionsRepository: Repository<Collection>,
    private readonly getAssetsListService: GetAssetsListService,
    private readonly cryptoService: CryptoService,
  ) {}

  async exec({
    collection_name,
    amount,
  }: GenerateImagesMetadata): Promise<any> {
    const { id: collection_id } =
      await this.collectionsRepository.findOneOrFail({
        where: { name: collection_name },
      });
    const assets_list = this.getAssetsListService.exec({ collection_name });
    const hashes: string[] = [];
    const images_metadata: any = [];

    while (hashes.length < amount) {
      const metadata = this.generateMetadata({ assets_list });

      const hash = this.cryptoService.getHash(
        Buffer.from(JSON.stringify(metadata)),
      );

      const result = await this.imagesRepository.findOneBy({
        collection_id,
        hash,
      });

      if (!hashes.includes(hash) && !result) {
        hashes.push(hash);
        images_metadata.push(metadata);
        await this.imagesRepository.save({
          collection_id,
          hash,
          metadata: JSON.stringify(metadata),
          url: `www.${hash}.com`,
        });
      }
    }

    return images_metadata;
  }

  private generateMetadata({ assets_list }: AssetsList) {
    const metadata: Record<string, string> = {};

    Object.keys(assets_list).map((key) => {
      metadata[key] =
        assets_list[key][
          Math.floor(Math.random() * (assets_list[key].length - 1))
        ];
    });

    return metadata;
  }
}

interface GenerateImagesMetadata {
  collection_name: string;
  amount: number;
}

interface AssetsList {
  assets_list: Record<string, string[]>;
}
