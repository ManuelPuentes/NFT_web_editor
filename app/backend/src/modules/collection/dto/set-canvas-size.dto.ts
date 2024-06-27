import { IsNotEmpty, IsObject } from 'class-validator';

import { BoundingRect } from '../interfaces/bounding-rect.interface';
export class SetCanvasSizetDto {
    @IsNotEmpty({ message: '$property cant be empty or null' })
    @IsObject({ message: '$property must be a bounding rect json' })
    size: BoundingRect
}

