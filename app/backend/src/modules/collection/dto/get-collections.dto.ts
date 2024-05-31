
import { IsIn } from 'class-validator';
import { PaginatedRequestDTO } from 'src/modules/common/dto/paginated-request.dto';

interface Collection {
  id: string;
  name: string;
  amount: number;
}

export class GetCollectionsDTO extends PaginatedRequestDTO<Collection> {
  @IsIn(['id', 'name', 'amount'])
  orderBy?: keyof Collection | undefined;
}
