import { Request, Response } from "express";

import { ListAllTasksUseCase } from "./ListAllTasksUseCase";

class ListAllTasksController {
  constructor(private listAllTasksUseCase: ListAllTasksUseCase) {}
  handle(request: Request, response: Response): Response {
    try {
      const tasks = this.listAllTasksUseCase.execute();
      return response.json({ tasks });
    } catch (err) {
      return response.status(502).json({
        error: err.message,
      });
    }
  }
}

export { ListAllTasksController };
