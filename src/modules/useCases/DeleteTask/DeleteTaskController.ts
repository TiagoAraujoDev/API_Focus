import { Request, Response } from "express";

import { DeleteTaskUseCase } from "./DeleteTaskUseCase";

class DeleteTaskController {
  constructor(private deleteTaskUseCase: DeleteTaskUseCase) {}

  handle(request: Request, response: Response): Response {
    const { task_id } = request.params;

    try {
      this.deleteTaskUseCase.execute(task_id);

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      });
    }
  }
}

export { DeleteTaskController };
