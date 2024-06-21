import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateCollectionDto {
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
