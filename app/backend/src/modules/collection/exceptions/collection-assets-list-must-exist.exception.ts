import { HttpException, HttpStatus } from '@nestjs/common';

export class CollectionAssetsListMustExistException extends HttpException {
    constructor(collection_name: string) {
        super(` collection: "${collection_name}" needs to generate the assets_list before you can generate images `, HttpStatus.CONFLICT);
    }
}
