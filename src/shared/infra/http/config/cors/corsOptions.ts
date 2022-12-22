import { CorsOptions } from "cors";

import { allowedOrigins } from "./allowedOrigins";

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS!"));
    }
  },
  credentials: true,
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
  methods: "POST, GET, PUT, DELETE",
  optionsSuccessStatus: 200,
};
