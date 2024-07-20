import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { GenerationStatus } from './enums/generation-status.enum';
import { Image } from './image.entity';

@Entity('collection')
export class Collection {
  @PrimaryColumn({ name: 'id', type: 'uuid', generated: true })
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ name: 'amount', type: 'integer', default: 0 })
  amount: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: GenerationStatus,
    default: GenerationStatus.INACTIVE,
  })
  status: GenerationStatus;

  // @OneToMany(() => Image, (image) => image.collection)
  // images: Image[];
}
