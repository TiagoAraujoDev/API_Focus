import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { DeleteCycleUseCase } from "./DeleteCycleUseCase";

class DeleteCycleController {
  async handle(request: Request, response: Response): Promise<Response> {
    //  TODO:
    const { id } = request.headers;

    if (!id) {
      throw new AppError("Missing cycle id!");
    }

    if (Array.isArray(id)) {
      throw new AppError("Too many ids sent!");
    }

    const deleteCycleUseCase = container.resolve(DeleteCycleUseCase);
    await deleteCycleUseCase.execute(id);

    return response.sendStatus(204);
  }
}

export { DeleteCycleController };
