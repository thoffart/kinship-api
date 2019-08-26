import {MigrationInterface, QueryRunner} from "typeorm";

export class modePerfilUsuario1563392670342 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "modo_perfil" SET DEFAULT 'Privado'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "modo_perfil" DROP DEFAULT`);
    }

}
