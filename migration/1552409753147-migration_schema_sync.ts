import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationSchemaSync1552409753147 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const tableUsuarios = await queryRunner.query(`SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'usuarios')`);
        if (!tableUsuarios[0].exists) {
            await queryRunner.query(`CREATE TABLE IF NOT EXISTS "usuarios" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);

        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
