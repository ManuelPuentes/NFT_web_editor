import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { Collection } from '../entities/collection.entity';
import { CollectionDoesNotExistException } from '../exceptions/collection-does-not-exists.collection';

@Injectable()
export class CollectionMustExistGuard implements CanActivate {
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
    const { collection_name } = request.params;

    if (!collection_name)
      throw new HttpException('invalid request', HttpStatus.BAD_REQUEST);

    try {
      await this.collectionsRepository.findOneOrFail({
        where: {
          name: collection_name,
        },
      });
    } catch (error) {
      throw new CollectionDoesNotExistException(collection_name);
    }

    return true;
  }
}
