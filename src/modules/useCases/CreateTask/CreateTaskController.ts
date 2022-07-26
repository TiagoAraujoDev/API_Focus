import { Request, Response } from "express";

import { CreateTaskUseCase } from "./CreateTaskUseCase";

class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { title, user_id } = request.body;

    await this.createTaskUseCase.execute({ title, user_id });

    return response.status(201).send();
  }
}

export { CreateTaskController };
