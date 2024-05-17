import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import { ProjectAlreadyExistsException } from '../exceptions/project-already-exist.exception';

@Injectable()
export class CreateProjectMiddleware implements NestMiddleware {
    use({ query }: Request, res: Response, next: NextFunction) {
        const project_name = query.name;

        if(!project_name){
            throw new HttpException('property cant be empty or null', HttpStatus.BAD_REQUEST)
        }

        if (fs.existsSync(`projects/${project_name}`)) {
            throw new ProjectAlreadyExistsException();
        }
        next();
    }
}
