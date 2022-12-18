import "reflect-metadata";
import cors from "cors";
import express from "express";
import "express-async-errors";

import "../../container";

import { createConnection } from "../typeorm";
import { corsOptions } from "./config/cors/corsOptions";
import { errorHandling } from "./middlewares/error";
import { router } from "./routes";

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(router);
app.use(errorHandling);

createConnection("database_pomoroutine");

export { app };
