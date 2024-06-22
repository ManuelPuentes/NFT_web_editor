import { IsNotEmpty, IsObject } from 'class-validator';
import { AssetDetails } from '../interfaces/asset-details.interface';

export class SetAssetDeatilstDto {
    @IsNotEmpty({ message: '$property cant be empty or null' })
    @IsObject({ message: '$property must be an array' })
    assets_details: Record<string, AssetDetails>
}

