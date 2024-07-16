import { AssetDetails } from '../interfaces/asset-details.interface';

export class CollectionAssetsDetailsData {
  private data: Record<string, Record<string, AssetDetails>>;

  constructor(data: Record<string, Record<string, AssetDetails>>) {
    this.data = data;
  }

  get({
    trait_name,
    element_name,
  }: {
    trait_name: string;
    element_name: string;
  }): any {
    return this.data[trait_name][element_name];
  }
}
