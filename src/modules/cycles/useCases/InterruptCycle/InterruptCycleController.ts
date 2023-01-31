import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { InterruptCycleUseCase } from "./InterruptCycleUseCase";

class InterruptCycleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;

    if (!id) {
      throw new AppError("Missing cycle id!", 404);
    }

    if (Array.isArray(id)) {
      throw new AppError("Too many ids sent!", 404);
    }

    const interruptCycleUseCase = container.resolve(InterruptCycleUseCase);
    await interruptCycleUseCase.execute(id);

    return response.status(204);
  }
}

export { InterruptCycleController };
