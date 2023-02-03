import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { CyclesRepository } from "../../infra/typeorm/repositories/CyclesRepository";

@injectable()
class DeleteCycleUseCase {
  constructor(
    @inject("CyclesRepository")
    private cyclesRepository: CyclesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const cycle = await this.cyclesRepository.findById(id);
    if (!cycle) {
      throw new AppError("Cycle not found!", 404);
    }

    await this.cyclesRepository.delete(id);
  }
}

export { DeleteCycleUseCase };
