import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class GenerateImagesDto {
  @IsNotEmpty({ message: '$property cant be empty or null' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: '$property must be a number' },
  )
  @IsPositive({ message: '$property must be positive number' })
  amount: number;
}
