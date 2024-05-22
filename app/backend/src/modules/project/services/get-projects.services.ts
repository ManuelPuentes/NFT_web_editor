import { Injectable } from '@nestjs/common';
import { Project } from '../entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { PaginatedRequest } from 'src/modules/common/interfaces/paginated-request.interface';
import { PaginatedResponse } from 'src/modules/common/interfaces/paginated-response.interface';


@Injectable()
export class GetProjectsService {

    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) { }

    async exec(
        {
            limit,
            skip = 0,
            orderBy,
            orderType
        }: PaginatedRequest<Project>): Promise<PaginatedResponse<any>> {


        const query = this.projectRepository.createQueryBuilder(
            "project"
        )
            .select("project.name", "name")
            .addSelect("project.id", "id")
            .addSelect("project.amount", "amount")
            .skip(skip)
            .take(limit)

        if (orderBy)
            query.orderBy(orderBy, orderType)


        const items = await query.getRawMany();
        const totalItems = items.length;
        const nextItem = (Number(skip) + Number(totalItems))


        return {
            items,
            totalItems,
            nextItem
        }

    }
}
