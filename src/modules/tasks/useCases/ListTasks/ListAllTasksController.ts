import { Request, Response } from "express";

import { ListAllTasksUseCase } from "./ListAllTasksUseCase";

class ListAllTasksController {
  constructor(private listAllTasksUseCase: ListAllTasksUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const tasks = await this.listAllTasksUseCase.execute();

    return response.json({ tasks });
  }
}

export { ListAllTasksController };
