import { IsArray, IsNotEmpty } from 'class-validator';
import { CollectionDto } from './collection.dto';

export class SetDrawOrderDto extends CollectionDto {
  @IsNotEmpty({ message: '$property cant be empty or null' })
  @IsArray({ message: '$property must be an array' })
  draw_order: Array<string>;
}
