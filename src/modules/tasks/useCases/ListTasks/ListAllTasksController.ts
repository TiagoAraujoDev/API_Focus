import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllTasksUseCase } from "./ListAllTasksUseCase";
import { allTasksMapper } from "./mapper/allTasksMapper";

class ListAllTasksController {
  async handle(_: Request, response: Response): Promise<Response> {
    const listAllTasksUseCase = container.resolve(ListAllTasksUseCase);

    const allTasks = await listAllTasksUseCase.execute();

    const tasks = allTasksMapper(allTasks);

    return response.json({ tasks });
  }
}

export { ListAllTasksController };
