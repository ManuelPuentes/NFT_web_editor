import { Injectable } from '@nestjs/common';
import { Hash, createHash } from 'node:crypto';

@Injectable()
export class CryptoService {
  private hash: Hash;

  getHash(data: Buffer): string {
    this.hash = createHash('sha256');
    this.hash.update(data);
    return this.hash.digest('hex');
  }
}
