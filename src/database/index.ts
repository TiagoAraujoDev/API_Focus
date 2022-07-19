import "reflect-metadata";
import { DataSource } from "typeorm";

/* docker-compose exec app node --require ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/database
yarn typeorm migration:create src/database/migrations/CreateCategories */
export const appDataSource = new DataSource({
  type: "postgres",
  host: "database_pomoroutine",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "pomoroutinedb",
  migrations: ["./src/database/migrations/*.ts"],
});

appDataSource
  .initialize()
  .then(async () => {
    console.log("database initialized");
  })
  .catch((err) => console.log(err));
