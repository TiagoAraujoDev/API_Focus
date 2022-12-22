import { CorsOptions } from "cors";

import { allowedOrigins } from "./allowedOrigins";

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    console.log("origin before if: ", origin);
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      console.log("is in the array: ", allowedOrigins.indexOf(origin));
      console.log("origin: ", origin);
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS!"));
    }
  },
  optionsSuccessStatus: 200,
};
