import { CollectionAssetsDetailsData } from '../class/collection-assets-details-data';
import { CollectionAssetsJsonData } from '../class/collection-assets-json-data.class';
import { BoundingRect } from './bounding-rect.interface';

export interface GenerateSVG {
  collection_draw_order: string[];
  metadata: Record<string, string>;
  collection_canvas_size: BoundingRect;
  collection_assets_json_data: CollectionAssetsJsonData;
  collection_assets_details: CollectionAssetsDetailsData;
}
