import { AssetDetails } from './asset-details.interface';

export interface SetAssetsDetails {
  assets_details: Record<string, AssetDetails>;
  collection_name: string;
}
