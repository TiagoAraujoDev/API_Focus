import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUserTasksUseCase } from "./ListUserTasksUseCase";

class ListUserTasksController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listUserTasksUseCase = container.resolve(ListUserTasksUseCase);
    const userTasks = await listUserTasksUseCase.execute({ user_id });

    return response.json({ userTasks });
  }
}

export { ListUserTasksController };
