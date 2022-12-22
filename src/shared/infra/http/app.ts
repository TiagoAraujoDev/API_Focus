import "reflect-metadata";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import "express-async-errors";

import "../../container";

import { createConnection } from "../typeorm";
import { allowedOrigins } from "./config/cors/allowedOrigins";
import { corsOptions } from "./config/cors/corsOptions";
import { errorHandling } from "./middlewares/error";
import { router } from "./routes";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.options("*", cors({ credentials: true, origin: allowedOrigins }));

app.use(router);
app.use(errorHandling);

createConnection(process.env.POSTGRESQL_HOST);

export { app };
