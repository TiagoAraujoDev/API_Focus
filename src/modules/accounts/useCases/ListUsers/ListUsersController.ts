import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {
  async handle(_: Request, response: Response) {
    const listUsersUseCase = container.resolve(ListUsersUseCase);
    const users = await listUsersUseCase.execute();

    return response.status(200).json(users);
  }
}

export { ListUsersController };
