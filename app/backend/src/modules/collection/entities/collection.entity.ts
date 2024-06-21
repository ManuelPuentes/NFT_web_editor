import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('collection')
export class Collection {

    @PrimaryColumn({ type: 'uuid', name: 'id', generated: true })
    id: string;

    @Column({ name: 'name', type: 'varchar', length: 100 })
    name: string;

}
