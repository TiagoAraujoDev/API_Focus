import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteTaskUseCase } from "./DeleteTaskUseCase";

class DeleteTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;

    const deleteTaskUseCase = container.resolve(DeleteTaskUseCase);

    await deleteTaskUseCase.execute({ id } as {
      id: string;
    });

    return response.status(204).send();
  }
}

export { DeleteTaskController };
