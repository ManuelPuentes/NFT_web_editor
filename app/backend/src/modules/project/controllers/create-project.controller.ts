import { Controller, Post, UseInterceptors, UploadedFile, Query, ParseFilePipe, FileTypeValidator, ValidationPipe } from '@nestjs/common';
import { CreateProjectService } from '../services/create-project.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../config/multer.config';


@Controller('project')
export class CreateProjectController {
    constructor(private readonly createProjectService: CreateProjectService) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('assets', { storage }))
    async uploadFile(

        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: 'application/zip' }),
                ],
            }),
        )
        assets: Express.Multer.File,

        @Query() { name, amount  }: CreateProjectDto
    ) {


        return await this.createProjectService.exec({ name, amount, assets })
    }

}

