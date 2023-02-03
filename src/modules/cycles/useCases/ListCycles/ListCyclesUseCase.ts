import { inject, injectable } from "tsyringe";

import { Cycle } from "../../infra/typeorm/entities/Cycle";
import { CyclesRepository } from "../../infra/typeorm/repositories/CyclesRepository";

@injectable()
class ListCycleUseCase {
  constructor(
    @inject("CyclesRepository")
    private cycleRepository: CyclesRepository
  ) {}
  async execute(): Promise<Cycle[]> {
    const cycles = await this.cycleRepository.getAll();

    return cycles;
  }
}

export { ListCycleUseCase };
