import { OrderType } from '../enums/order-type.enum';

export interface PaginatedRequest<C> {
  skip?: number;
  limit?: number;
  orderBy?: keyof C;
  orderType?: OrderType;
}
