import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetUserUseCase } from "./GetUserUseCase";

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const getUserUseCase = container.resolve(GetUserUseCase);
    const user = await getUserUseCase.execute(user_id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, created_at, ...userMapped } = user;

    return response.json(userMapped);
  }
}

export { GetUserController };
