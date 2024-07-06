import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { Collection } from '../entities/collection.entity';
import { CollectionAlreadyExistsException } from '../exceptions/collection-already-exist.exception';

@Injectable()
export class CreateCollectionGuard implements CanActivate {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionsRepository: Repository<Collection>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return this.validateRequest(request);
  }

  async validateRequest(request: Request): Promise<boolean> {
    const collection_name: string | undefined = request.query.name?.toString();

    if (!collection_name) return false;

    const collection = await this.collectionsRepository.findOne({
      where: {
        name: collection_name,
      },
    });

    if (collection) {
      throw new CollectionAlreadyExistsException();
    }
    return true;
  }
}
