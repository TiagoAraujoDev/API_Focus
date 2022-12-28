import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { UsersTokens } from "../../../modules/accounts/infra/typeorm/entities/UsersTokens";
import { Task } from "../../../modules/tasks/infra/typeorm/entities/Task";

dotenv.config();

const DB_PORT = Number(process.env.POSTGRESQL_PORT);

/*
 * TypeORM commands doc
 *
 * Create a migration
 * $ yarn typeorm migration:create src/shared/infra/typeorm/migrations/CreateCategories
 *
 * Run/revert migrations
 * $ yarn typeorm:runMigrations -> in this case run
 * script to:
 * $ node --require ts-node/register ./node_modules/typeorm/cli.js migration:{run/revert} --dataSource {path/to/DataSource}
 *
 */
export const appDataSource = new DataSource({
  //  WARN: Uncomment the url for production
  url: process.env.POSTGRESQL_DB_URL,
  type: "postgres",
  host: process.env.POSTGRESQL_HOST,
  port: DB_PORT,
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  entities: [User, Task, UsersTokens],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

export const createConnection = async (
  host = "localhost"
): Promise<DataSource> => {
  const dataSource = await appDataSource
    .setOptions({
      host,
    })
    .initialize();

  //  WARN: Uncomment runMigrations() for production
  await appDataSource.runMigrations();
  console.log("database initialized");
  return dataSource;
};
