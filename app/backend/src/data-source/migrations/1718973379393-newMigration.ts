import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1718973379393 implements MigrationInterface {

    name = 'NewMigration1718973379393';

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.query(
            `DO $$ BEGIN
                CREATE TYPE generation_status AS ENUM ('active', 'inactive');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;`,
        );

        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS collection (
                id UUID NOT NULL DEFAULT uuid_generate_v4(),
                name CHARACTER VARYING(100) NOT NULL,
                amount INTEGER NOT NULL DEFAULT 0,
                status generation_status NOT NULL DEFAULT 'inactive',
                CONSTRAINT collection_pk PRIMARY KEY (id),
                CONSTRAINT amount_nonnegative CHECK (amount >= 0)
            )`,
        );


        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS image (
                id UUID NOT NULL DEFAULT uuid_generate_v4(),
                collectionId UUID NOT NULL,
                hash CHARACTER VARYING(255) NOT NULL,
                metadata JSON NOT NULL,
                url CHARACTER VARYING(255) NOT NULL,
                CONSTRAINT image_pk PRIMARY KEY (id)
            )`,
        );

        await queryRunner.query(
            `DO $$
            BEGIN
              IF NOT EXISTS (
                SELECT 1 
                FROM 
                  information_schema.table_constraints
                WHERE 
                  constraint_name = 'collection_name_key'
                  AND table_name = 'collection'
                  AND constraint_type = 'UNIQUE'
              ) THEN
                ALTER TABLE ONLY collection ADD CONSTRAINT collection_name_key UNIQUE (name);
              END IF;
            END $$;`,
        );
        await queryRunner.query(
            `DO $$
            BEGIN
              IF NOT EXISTS (
                SELECT 1 
                FROM 
                  information_schema.table_constraints
                WHERE 
                  constraint_name = 'image_hash_key'
                  AND table_name = 'image'
                  AND constraint_type = 'UNIQUE'
              ) THEN
                ALTER TABLE ONLY image ADD CONSTRAINT image_hash_key UNIQUE (hash);
              END IF;
            END $$;`,
        );

        await queryRunner.query(
          `DO $$
          BEGIN
            IF NOT EXISTS (
              SELECT 1 
              FROM 
                information_schema.table_constraints
              WHERE 
                constraint_name = 'image_url_key'
                AND table_name = 'image'
                AND constraint_type = 'UNIQUE'
            ) THEN
              ALTER TABLE ONLY image ADD CONSTRAINT image_url_key UNIQUE (url);
            END IF;
          END $$;`,
      );

        await queryRunner.query(
            `DO $$
            BEGIN
              IF NOT EXISTS (
                SELECT 1 
                FROM 
                  information_schema.table_constraints
                WHERE 
                  constraint_name = 'collection_fk'
                  AND table_name = 'image'
                  AND constraint_type = 'FOREIGN KEY'
              ) THEN
                ALTER TABLE ONLY image ADD CONSTRAINT collection_fk FOREIGN KEY (collectionId) REFERENCES collection(id);
              END IF;
            END $$;`,
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS collection`);
        await queryRunner.query(`DROP TABLE IF EXISTS image`);
        await queryRunner.query(`DROP TYPE IF EXISTS generation_status`);
        await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE`);
    }

}
