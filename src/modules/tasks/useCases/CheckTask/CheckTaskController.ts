import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { CheckTaskUseCase } from "./CheckTaskUseCase";

class CheckTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;
    if (!id) {
      throw new AppError("Missing task id!");
    }

    const checkTaskUseCase = container.resolve(CheckTaskUseCase);
    const checkedTask = await checkTaskUseCase.execute({ id } as {
      id: string;
    });

    return response.json({ checkedTask });
  }
}

export { CheckTaskController };
