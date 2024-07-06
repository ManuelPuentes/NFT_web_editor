import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { SetAssetsDetails } from '../interfaces/set-assets-details.interface';

@Injectable()
export class SetAssetsDetailsService {
  constructor() {}

  async exec({
    collection_name,
    assets_details,
  }: SetAssetsDetails): Promise<void> {
    fs.writeFileSync(
      `./collections/${collection_name}/assets_details.json`,
      JSON.stringify(assets_details),
    );
  }
}
