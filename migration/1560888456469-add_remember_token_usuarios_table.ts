import {MigrationInterface, QueryRunner} from "typeorm";

export class addRememberTokenUsuariosTable1560888456469 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "remember_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "remember_token"`);
    }

}
