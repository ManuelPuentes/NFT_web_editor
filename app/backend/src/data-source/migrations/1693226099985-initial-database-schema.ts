import { MigrationInterface, QueryRunner } from 'typeorm';

export class newSchema1693226099985 implements MigrationInterface {
    name = 'newSchema1693226099985';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS project (
                id UUID NOT NULL DEFAULT uuid_generate_v4(),
                name CHARACTER VARYING(100) NOT NULL,
                amount INTEGER NOT NULL,
                CONSTRAINT project_pk PRIMARY KEY (id)
            )`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS project`);

        await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE`);
    }
}
