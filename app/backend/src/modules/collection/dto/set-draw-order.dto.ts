import { IsArray, IsNotEmpty } from 'class-validator';

export class SetDrawOrderDto {
  @IsNotEmpty({ message: '$property cant be empty or null' })
  @IsArray({ message: '$property must be an array' })
  draw_order: Array<string>;
}
