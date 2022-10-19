import { DataSource } from "typeorm";

import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { UsersTokens } from "../../../modules/accounts/infra/typeorm/entities/UsersTokens";
import { Task } from "../../../modules/tasks/infra/typeorm/entities/Task";

/* docker compose exec app node --require ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/shared/infra/typeorm
yarn typeorm migration:create src/database/migrations/CreateCategories */
export const appDataSource = new DataSource({
  type: "postgres",
  host: "database_pomoroutine",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "pomoroutinedb",
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

  console.log("database initialized");
  return dataSource;
};
