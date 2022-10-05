import { Request, Response } from "express";

import { AppError } from "../../../errors/AppError";

const errorHandling = (err: Error, _: Request, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error. ${err.message}.`,
  });
};

export { errorHandling };
