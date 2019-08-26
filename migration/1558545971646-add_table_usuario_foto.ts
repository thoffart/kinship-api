import {MigrationInterface, QueryRunner} from "typeorm";

export class addTableUsuarioFoto1558545971646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "foto_perfil" character varying`);

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "foto_perfil"`);
    }

}
