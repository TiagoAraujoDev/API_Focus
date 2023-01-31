import { inject, injectable } from "tsyringe";

import { CyclesRepository } from "../../infra/typeorm/repositories/CyclesRepository";

@injectable()
class InterruptCycleUseCase {
  constructor(
    @inject("CyclesRepository")
    private cyclesRepository: CyclesRepository
  ) {}

  async execute(id: string): Promise<void> {
    //  TODO:
    await this.cyclesRepository.interrupt(id);
  }
}

export { InterruptCycleUseCase };
