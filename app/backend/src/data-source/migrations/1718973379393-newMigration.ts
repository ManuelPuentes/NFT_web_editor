import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1718973379393 implements MigrationInterface {

    name = 'NewMigration1718973379393';

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS collection (
                id UUID NOT NULL DEFAULT uuid_generate_v4(),
                name CHARACTER VARYING(100) NOT NULL,
                CONSTRAINT collection_pk PRIMARY KEY (id)
            )`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS collection`);
        await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE`);
    }

}
