import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    //  TODO: Move secret to .env
    const { sub: user_id } = jwt.verify(
      token,
      "60aa9604807343718f0dad07ad10681f"
    ) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
