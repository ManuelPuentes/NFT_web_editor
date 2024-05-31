import { Injectable } from '@nestjs/common';
import { Collection } from '../entities/collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { PaginatedRequest } from 'src/modules/common/interfaces/paginated-request.interface';
import { PaginatedResponse } from 'src/modules/common/interfaces/paginated-response.interface';


@Injectable()
export class GetCollectionsService {

    constructor(
        @InjectRepository(Collection)
        private readonly collectionsRepository: Repository<Collection>,
    ) { }

    async exec(
        {
            limit,
            skip = 0,
            orderBy,
            orderType
        }: PaginatedRequest<Collection>): Promise<PaginatedResponse<Collection>> {


        const query = this.collectionsRepository.createQueryBuilder(
            "collection"
        )
            .select("collection.name", "name")
            .addSelect("collection.id", "id")
            .addSelect("collection.amount", "amount")
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
