import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCycleUseCase } from "./ListCyclesUseCase";

class ListCyclesController {
  async handle(_: Request, response: Response): Promise<Response> {
    const listCyclesUseCase = container.resolve(ListCycleUseCase);
    const cycles = await listCyclesUseCase.execute();

    return response.json(cycles);
  }
}

export { ListCyclesController };
