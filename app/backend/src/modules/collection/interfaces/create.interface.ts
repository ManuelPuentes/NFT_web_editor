import { File } from './file.interface';
export interface CreateCollection {
    name: string;
    assets: File;
    amount:number;
}