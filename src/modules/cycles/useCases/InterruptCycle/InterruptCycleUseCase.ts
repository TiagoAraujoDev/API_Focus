import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { CyclesRepository } from "../../infra/typeorm/repositories/CyclesRepository";

@injectable()
class InterruptCycleUseCase {
  constructor(
    @inject("CyclesRepository")
    private cyclesRepository: CyclesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const cycle = await this.cyclesRepository.findById(id);
    if (!cycle) {
      throw new AppError("Cycle not found!", 404);
    }

    if (cycle.interruptedDate || cycle.finishedDate) {
      throw new AppError("Cycle already finished or interrupted!");
    }

    await this.cyclesRepository.interrupt(id);
  }
}

export { InterruptCycleUseCase };
