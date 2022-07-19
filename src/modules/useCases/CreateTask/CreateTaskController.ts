import { Request, Response } from "express";

import { CreateTaskUseCase } from "./CreateTaskUseCase";

class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;

    await this.createTaskUseCase.execute({ title });

    return response.status(201).send();
  }
}

export { CreateTaskController };
