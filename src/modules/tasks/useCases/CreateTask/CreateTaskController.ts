import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateTaskUseCase } from "./CreateTaskUseCase";

class CreateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, user_id } = request.body;

    const createTaskUseCase = container.resolve(CreateTaskUseCase);

    await createTaskUseCase.execute({ title, user_id });

    return response.status(201).send();
  }
}

export { CreateTaskController };
