import { CentralDirectory } from "unzipper";

export interface Unzipper {
    unzipFile(inputPath: string, outputPath: string): Promise<void>;
    unzipStream(buffer: Buffer): Promise<CentralDirectory>;
}
