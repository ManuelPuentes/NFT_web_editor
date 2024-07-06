import { IsNotEmpty, IsObject } from 'class-validator';
import { AssetDetails } from '../interfaces/asset-details.interface';
import { CollectionDto } from './collection.dto';

export class SetAssetDeatilstDto extends CollectionDto {
  @IsNotEmpty({ message: '$property cant be empty or null' })
  @IsObject({ message: '$property must be an array' })
  assets_details: Record<string, AssetDetails>;
}
