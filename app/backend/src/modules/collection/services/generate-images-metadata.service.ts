import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../entities/image.entity';
import { GetAssetsListService } from './get-asset-list.service';

@Injectable()
export class GenerateImagesMetadataService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,
    private readonly getAssetsListService: GetAssetsListService,
  ) {}

  async exec({
    collection_name,
    amount,
  }: GenerateImagesMetadata): Promise<any> {
    const assets_list = this.getAssetsListService.exec({ collection_name });

    const images_metadata = [];

    for (let i = 0; i < amount; i++) {
      images_metadata.push(this.generateMetadata({ assets_list }));
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
