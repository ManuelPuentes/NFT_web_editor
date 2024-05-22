import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('project')
export class Project {

    @PrimaryColumn({ type: 'uuid', name: 'id' })
    id: string;

    @Column({ name: 'name', type: 'varchar', length: 100 })
    name: string;

    @Column({ name: 'amount', type: 'int' })
    amount: number;

}
