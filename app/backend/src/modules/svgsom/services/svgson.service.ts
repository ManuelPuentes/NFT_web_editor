import { Injectable } from '@nestjs/common';
import * as svgson from 'svgson';
import * as fs from 'fs';
import * as path from 'path';
import { InvalidFileExtensionException } from '../exceptions/invalid.file.extension.execption';
import { SVG } from '../const/svg.extension';

@Injectable()
export class SvgsonService {
    constructor() { }

    parseToJson({ file_path }: { file_path: string }): svgson.INode {

        if (path.extname(file_path) != SVG) {
            throw new InvalidFileExtensionException();
        }
        const svg_file: string = fs.readFileSync(file_path, { encoding: "utf-8" });
        return svgson.parseSync(svg_file);
    }
}
