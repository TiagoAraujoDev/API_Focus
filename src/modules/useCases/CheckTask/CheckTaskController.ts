import { Request, Response } from "express";

import { CheckTaskUseCase } from "./CheckTaskUseCase";

class CheckTaskController {
  constructor(private checkTaskUseCase: CheckTaskUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { task_id } = request.body;

    try {
      const task = await this.checkTaskUseCase.execute(task_id);

      return response.json({ task });
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      });
    }
  }
}

export { CheckTaskController };
