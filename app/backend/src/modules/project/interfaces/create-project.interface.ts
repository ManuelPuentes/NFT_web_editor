import { File } from './file.interface';
export interface CreateProject {
    name: string;
    assets: File;
    amount:number;
}