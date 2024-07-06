import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { OrderType } from '../enums/order-type.enum';
import { Type } from 'class-transformer';

export abstract class PaginatedRequestDTO<C> {
  @IsOptional()
  @IsInt({ message: `$property must be a integer number` })
  @Min(0, { message: '$property must be greater than or equal to 0' })
  @IsNotEmpty({ message: `$property can't be empty or null` })
  @Type(() => Number)
  readonly skip?: number;

  @IsOptional()
  @IsInt({ message: `$property must be a integer number` })
  @IsPositive({ message: `$property must be a positive number` })
  @IsNotEmpty({ message: `$property can't be empty or null` })
  @Type(() => Number)
  readonly limit?: number;

  @IsString()
  @IsOptional()
  orderBy?: keyof C;

  @IsEnum(OrderType, { message: '$property must be "ASC" or "DESC"' })
  readonly orderType: OrderType = OrderType.DESC;
}
