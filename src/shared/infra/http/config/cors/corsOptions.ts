import { CorsOptions } from "cors";

import { allowedOrigins } from "./allowedOrigins";

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS!"));
  },
  optionsSuccessStatus: 200,
};
