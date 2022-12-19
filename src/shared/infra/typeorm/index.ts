import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { UsersTokens } from "../../../modules/accounts/infra/typeorm/entities/UsersTokens";
import { Task } from "../../../modules/tasks/infra/typeorm/entities/Task";

dotenv.config();

console.log(process.env.POSTGRESQL_HOST);
const DB_PORT = Number(process.env.POSTGRESQL_PORT);
/* docker compose exec app node --require ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/shared/infra/typeorm
yarn typeorm migration:create src/database/migrations/CreateCategories */
export const appDataSource = new DataSource({
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

  await appDataSource.runMigrations();
  console.log("database initialized");
  return dataSource;
};
