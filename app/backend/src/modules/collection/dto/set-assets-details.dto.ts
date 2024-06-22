import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString, IsObject } from 'class-validator';
import { AssetDetails } from '../interfaces/asset-details.interface';

export class SetAssetDeatilstDto {
    @IsNotEmpty({ message: '$property cant be empty or null' })
    @IsObject({ message: '$property must be an array' })
    assets_details: Record<string, AssetDetails>

    @IsNotEmpty({ message: '$property cant be empty or null' })
    @IsString({ message: '$property must be a string' })
    @Transform(({ value }: TransformFnParams) => {
        if (typeof value !== 'string') {
            return value;
        }
        return value.toLowerCase();
    })
    name: string;
}
