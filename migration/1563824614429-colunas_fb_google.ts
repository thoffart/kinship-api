import { MigrationInterface, QueryRunner } from "typeorm";

export class colunasFbGoogle1563824614429 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "id_facebook" character varying`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "UQ_d6563f0c8f0928f43a622b17886" UNIQUE ("id_facebook")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_d6563f0c8f0928f43a622b17886"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "id_facebook"`);
    }

}
