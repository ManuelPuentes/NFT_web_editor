
import { IsIn } from 'class-validator';
import { PaginatedRequestDTO } from 'src/modules/common/dto/paginated-request.dto';

interface Project {
  id: string;
  name: string;
  amount: number;
}

export class GetProjectsDTO extends PaginatedRequestDTO<Project> {
  @IsIn(['id', 'name', 'amount'])
  orderBy?: keyof Project | undefined;
}
