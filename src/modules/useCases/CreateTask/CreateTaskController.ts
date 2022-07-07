import { Request, Response } from "express";

import { CreateTaskUseCase } from "./CreateTaskUseCase";

class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}
  handle(request: Request, response: Response): Response {
    const { title } = request.body;
    try {
      const task = this.createTaskUseCase.execute({ title });
      return response.status(201).json({ task });
    } catch (err) {
      return response.status(500).json({
        error: err.message,
      });
    }
  }
}

export { CreateTaskController };
