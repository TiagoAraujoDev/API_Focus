import { Request, Response } from "express";
import { container } from "tsyringe";

import { CheckTaskUseCase } from "./CheckTaskUseCase";

class CheckTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;

    const checkTaskUseCase = container.resolve(CheckTaskUseCase);

    const task = await checkTaskUseCase.execute({ id } as {
      id: string;
    });

    return response.json({ task });
  }
}

export { CheckTaskController };
