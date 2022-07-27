import { Request, Response } from "express";

import { CheckTaskUseCase } from "./CheckTaskUseCase";

class CheckTaskController {
  constructor(private checkTaskUseCase: CheckTaskUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;

    const task = await this.checkTaskUseCase.execute({ id } as {
      id: string;
    });

    return response.json({ task });
  }
}

export { CheckTaskController };
