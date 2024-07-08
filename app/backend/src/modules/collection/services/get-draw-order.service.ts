import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { CollectionAssetsDetailsNotFoundException } from '../exceptions/collection-assets-details-not-found.exception';

@Injectable()
export class GetDrawOrderService {
  constructor() {}
  async exec({
    collection_name,
  }: {
    collection_name: string;
  }): Promise<Array<string>> {
    this.ensureAssetsDetailsFileExist({ collection_name });

    const draw_order: Array<string> = this.collectionDrawOrderFileExist({
      collection_name,
    })
      ? this.readDrawOrderFile({ collection_name })
      : this.generateDrawOrderFile({ collection_name });

    return draw_order;
  }

  private collectionDrawOrderFileExist({
    collection_name,
  }: {
    collection_name: string;
  }) {
    const path = `./collections/${collection_name}/draw_order.json`;
    return fs.existsSync(path);
  }

  private ensureAssetsDetailsFileExist({
    collection_name,
  }: {
    collection_name: string;
  }) {
    const path = `./collections/${collection_name}/assets_details.json`;
    if (!fs.existsSync(path)) {
      throw new CollectionAssetsDetailsNotFoundException();
    }
  }

  private readDrawOrderFile({ collection_name }: { collection_name: string }) {
    const path = `./collections/${collection_name}/draw_order.json`;
    return JSON.parse(fs.readFileSync(path).toString());
  }

  private generateDrawOrderFile({
    collection_name,
  }: {
    collection_name: string;
  }) {
    const assets_details_path = `./collections/${collection_name}/assets_details.json`;
    const draw_order_path = `./collections/${collection_name}/draw_order.json`;

    const draw_order: Array<string> = Object.keys(
      JSON.parse(fs.readFileSync(assets_details_path).toString()),
    );

    fs.writeFileSync(draw_order_path, JSON.stringify(draw_order));

    return draw_order;
  }
}
