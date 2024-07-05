import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Collection } from './collection.entity';


@Entity('image')
export class Image {

    @PrimaryColumn({ name: 'id', type: 'uuid', generated: true })
    id: string;

    @Column({ name: 'collectionId', type: 'uuid' })
    collectionId: string;

    @Column({ name: 'metadata', type: 'json' })
    metadata: string;

    @Column({ name: 'hash', type: 'varchar', length: 255, unique: true })
    hash: string;

    @Column({ name: 'url', type: 'varchar', length: 255, unique: true })
    url: string;

    @ManyToOne(() => Collection, (collection) => collection.images)
    collection: Collection
}
