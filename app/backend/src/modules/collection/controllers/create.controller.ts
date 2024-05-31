import { Controller, Post, UseInterceptors, UploadedFile, Query, ParseFilePipe, FileTypeValidator, UseGuards } from '@nestjs/common';
import { CreateCollectionService } from '../services/create.service';
import { CreateCollectionDto } from '../dto/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../config/multer.config';
import { CreateCollectionGuard } from '../guards/create-collection.guard';


@Controller('collection')
export class CreateController {
    constructor(private readonly createCollectionService: CreateCollectionService) { }

    @Post('create')
    @UseGuards(CreateCollectionGuard)
    @UseInterceptors(FileInterceptor('assets', { storage }))
    async execute(

        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: 'application/zip' }),
                ],
            }),
        )
        assets: Express.Multer.File,

        @Query() { name, amount }: CreateCollectionDto
    ): Promise<void> {
        await this.createCollectionService.exec({ name, amount, assets })
    }

}

