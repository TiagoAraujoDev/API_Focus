import "reflect-metadata";
import { DataSource } from "typeorm";

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
