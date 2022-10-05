import "reflect-metadata";
import express from "express";

import "../../container";

import "express-async-errors";
import { createConnection } from "../typeorm";
import { errorHandling } from "./middlewares/error";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandling);

createConnection("database_pomoroutine");

export { app };
