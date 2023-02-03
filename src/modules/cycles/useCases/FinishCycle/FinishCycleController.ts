import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { FinishCycleUseCase } from "./FinishCycleUseCase";

class FinishCycleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;

    if (!id) {
      throw new AppError("Missing cycle id!", 404);
    }

    if (Array.isArray(id)) {
      throw new AppError("Too many ids sent!", 404);
    }

    const finishCycleUseCase = container.resolve(FinishCycleUseCase);
    await finishCycleUseCase.execute(id);

    return response.status(204);
  }
}

export { FinishCycleController };
