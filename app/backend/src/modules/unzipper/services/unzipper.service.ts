import { Injectable } from '@nestjs/common';
import * as unzipper from 'unzipper'
import * as fs from 'fs';
import * as path from 'path';

import { Unzipper } from '../interfaces/unzipper.interface';

import { CentralDirectory } from "unzipper";

@Injectable()
export class UnzipperService implements Unzipper {
    constructor() { }

    async unzipFile(inputPath: string, outputPath?: string): Promise<void> {

        if (!outputPath) {
            outputPath = path.dirname(inputPath)
        }

        await new Promise(resolve => fs.createReadStream(inputPath)
            .pipe(unzipper.Extract({ path: outputPath })).on("close", resolve))
    }


    async unzipStream(buffer: Buffer): Promise<CentralDirectory> {
        return await unzipper.Open.buffer(buffer);
    }
}
