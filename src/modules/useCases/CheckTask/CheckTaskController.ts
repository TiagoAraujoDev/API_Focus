import { Request, Response } from "express";

import { CheckTaskUseCase } from "./CheckTaskUseCase";

class CheckTaskController {
  constructor(private checkTaskUseCase: CheckTaskUseCase) {}
  handle(request: Request, response: Response): Response {
    const { task_id } = request.params;
    try {
      const task = this.checkTaskUseCase.execute(task_id);
      return response.json({ task });
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      });
    }
  }
}

export { CheckTaskController };
