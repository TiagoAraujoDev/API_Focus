import "reflect-metadata";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import "express-async-errors";

import "../../container";

import { createConnection } from "../typeorm";
import { corsOptions } from "./config/cors/corsOptions";
import { errorHandling } from "./middlewares/error";
import { router } from "./routes";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

// app.use((_, res, next) => {
//   res.header("Access-Control-Allow-Origin", allowedOrigins);
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(cors(corsOptions));

app.options("*", cors());

app.use(router);
app.use(errorHandling);

createConnection(process.env.POSTGRESQL_HOST);

export { app };
