import "reflect-metadata";
import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "pomoroutinedb",
  migrations: ["./src/database/migrations/*.ts"],
});

appDataSource
  .initialize()
  .then(async () => {
    console.log("initializing Database...");
  })
  .catch((err) => console.log(err));
