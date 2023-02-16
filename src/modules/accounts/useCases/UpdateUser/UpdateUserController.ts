import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { username, email } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);
    await updateUserUseCase.execute(user_id, { username, email });

    return response.sendStatus(204);
  }
}

export { UpdateUserController };
