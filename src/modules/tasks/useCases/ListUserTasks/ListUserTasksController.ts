import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUserTasksUseCase } from "./ListUserTasksUseCase";

class ListUserTasksController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listUserTasksUseCase = container.resolve(ListUserTasksUseCase);

    const userTasks = await listUserTasksUseCase.execute({ user_id } as {
      user_id: string;
    });

    return response.json({ userTasks });
  }
}

export { ListUserTasksController };
