import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cookies } = request;
    if (!cookies?.jwt) {
      throw new AppError("No jwt available", 401);
    }

    const refreshToken = cookies.jwt;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
    const token = await refreshTokenUseCase.execute(refreshToken);

    return response.status(201).json(token);
  }
}

export { RefreshTokenController };
