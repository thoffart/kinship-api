import {MigrationInterface, QueryRunner} from "typeorm";

export class addNovosCamposUsuario1559930527661 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "usuarios_modo_perfil_enum" AS ENUM('Privado', 'Publico')`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "modo_perfil" "usuarios_modo_perfil_enum"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "data_nascimento" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "genero" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "genero"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "data_nascimento"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "modo_perfil"`);
        await queryRunner.query(`DROP TYPE "usuarios_modo_perfil_enum"`);
    }

}
