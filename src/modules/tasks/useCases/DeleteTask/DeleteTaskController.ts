import { Request, Response } from "express";

import { DeleteTaskUseCase } from "./DeleteTaskUseCase";

class DeleteTaskController {
  constructor(private deleteTaskUseCase: DeleteTaskUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;

    try {
      await this.deleteTaskUseCase.execute({ id } as {
        id: string;
      });

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      });
    }
  }
}

export { DeleteTaskController };
