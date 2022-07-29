import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/repositories/implamentations/UsersRepository";

interface IPayload {
  id: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  const { id } = jwt.verify(
    token,
    "60aa9604807343718f0dad07ad10681f"
  ) as IPayload;

  const userRepository = new UsersRepository();

  const user = await userRepository.findById(id);

  if (!user) {
    throw new AppError("User doesn't exist!", 401);
  }

  const { password: _, ...authenticatedUser } = user;

  request.user = authenticatedUser;

  next();
}
