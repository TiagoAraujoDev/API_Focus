import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { Task } from "../../../modules/tasks/infra/typeorm/entities/Task";

/* docker-compose exec app node --require ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/database
yarn typeorm migration:create src/database/migrations/CreateCategories */
export const appDataSource = new DataSource({
  type: "postgres",
  host: "database_pomoroutine",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "pomoroutinedb",
  entities: [User, Task],
  migrations: ["./src/database/migrations/*.ts"],
});

export const createConnection = (host = "localhost") => {
  appDataSource
    .setOptions({
      host,
    })
    .initialize()
    .then(async () => {
      console.log("database initialized");
    })
    .catch((err) => console.log(err));
};
