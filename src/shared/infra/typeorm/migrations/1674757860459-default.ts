import { MigrationInterface, QueryRunner } from "typeorm";

export class default1674757860459 implements MigrationInterface {
  name = "default1674757860459";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cycles" ("id" character varying NOT NULL, "task" character varying NOT NULL, "minutesAmount" integer NOT NULL, "startDate" date NOT NULL, "interruptedDate" date, "finishedDate" date, CONSTRAINT "PK_52e5eeb9c7c6e4ad1aed657967a" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cycles"`);
  }
}
