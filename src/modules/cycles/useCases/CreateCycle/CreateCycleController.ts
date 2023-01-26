import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { CreateCycleUseCase } from "./CreateCycleUseCase";

class CreateCycleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { task, minutesAmount, startDate } = request.body;
    const { id: user_id } = request.user;

    if (!task || !minutesAmount || !startDate) {
      throw new AppError("All fields are required!");
    }

    const createCycleUseCase = container.resolve(CreateCycleUseCase);
    const cycle = await createCycleUseCase.execute({
      task,
      minutesAmount,
      startDate,
      user_id,
    });

    return response.status(201).json(cycle);
  }
}

export { CreateCycleController };
