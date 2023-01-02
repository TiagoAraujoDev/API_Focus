import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { CreateTaskUseCase } from "./CreateTaskUseCase";

class CreateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;
    const { id: user_id } = request.user;

    if (!title) {
      throw new AppError("Missing title!");
    }

    const createTaskUseCase = container.resolve(CreateTaskUseCase);
    const newTask = await createTaskUseCase.execute({ title, user_id });

    return response.status(201).json(newTask);
  }
}

export { CreateTaskController };
