import { MigrationInterface, QueryRunner } from "typeorm";

export class default1674762172293 implements MigrationInterface {
  name = "default1674762172293";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cycles" ADD "user_id" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "cycles" ADD CONSTRAINT "FK_215c6b9274f41665a154db4dfc4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cycles" DROP CONSTRAINT "FK_215c6b9274f41665a154db4dfc4"`
    );
    await queryRunner.query(`ALTER TABLE "cycles" DROP COLUMN "user_id"`);
  }
}
