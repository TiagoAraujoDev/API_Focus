import { MigrationInterface, QueryRunner } from "typeorm";

export class default1674759522773 implements MigrationInterface {
  name = "default1674759522773";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "users_tokens" DROP COLUMN "expires_date"`
    );
    await queryRunner.query(
      `ALTER TABLE "users_tokens" ADD "expires_date" TIMESTAMP NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "cycles" DROP COLUMN "startDate"`);
    await queryRunner.query(
      `ALTER TABLE "cycles" ADD "startDate" TIMESTAMP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "cycles" DROP COLUMN "interruptedDate"`
    );
    await queryRunner.query(
      `ALTER TABLE "cycles" ADD "interruptedDate" TIMESTAMP`
    );
    await queryRunner.query(`ALTER TABLE "cycles" DROP COLUMN "finishedDate"`);
    await queryRunner.query(
      `ALTER TABLE "cycles" ADD "finishedDate" TIMESTAMP`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cycles" DROP COLUMN "finishedDate"`);
    await queryRunner.query(`ALTER TABLE "cycles" ADD "finishedDate" date`);
    await queryRunner.query(
      `ALTER TABLE "cycles" DROP COLUMN "interruptedDate"`
    );
    await queryRunner.query(`ALTER TABLE "cycles" ADD "interruptedDate" date`);
    await queryRunner.query(`ALTER TABLE "cycles" DROP COLUMN "startDate"`);
    await queryRunner.query(
      `ALTER TABLE "cycles" ADD "startDate" date NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users_tokens" DROP COLUMN "expires_date"`
    );
    await queryRunner.query(
      `ALTER TABLE "users_tokens" ADD "expires_date" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" character varying NOT NULL DEFAULT now()`
    );
  }
}
