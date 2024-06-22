import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CollectionNametDto {
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