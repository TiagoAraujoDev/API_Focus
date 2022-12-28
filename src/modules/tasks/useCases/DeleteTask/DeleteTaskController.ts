import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { DeleteTaskUseCase } from "./DeleteTaskUseCase";

class DeleteTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;
    if (!id) {
      throw new AppError("Missing task id!");
    }

    const deleteTaskUseCase = container.resolve(DeleteTaskUseCase);
    await deleteTaskUseCase.execute({ id } as {
      id: string;
    });

    return response.sendStatus(204);
  }
}

export { DeleteTaskController };
