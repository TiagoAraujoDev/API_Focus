import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllTasksUseCase } from "./ListAllTasksUseCase";

class ListAllTasksController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllTasksUseCase = container.resolve(ListAllTasksUseCase);

    const tasks = await listAllTasksUseCase.execute();

    return response.json({ tasks });
  }
}

export { ListAllTasksController };
