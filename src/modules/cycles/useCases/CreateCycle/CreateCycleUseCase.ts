import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { CyclesRepository } from "../../infra/typeorm/repositories/CyclesRepository";
import { ICreateCycleDTO } from "../../repositories/ICyclesRepository";

@injectable()
class CreateCycleUseCase {
  constructor(
    @inject("CyclesRepository")
    private cyclesRepository: CyclesRepository
  ) {}

  async execute({ task, minutesAmount, startDate, user_id }: ICreateCycleDTO) {
    if (typeof minutesAmount !== "number") {
      throw new AppError("minutesAmount must be of type number!", 404);
    }

    const cycle = await this.cyclesRepository.create({
      task,
      minutesAmount,
      startDate,
      user_id,
    });

    return cycle;
  }
}

export { CreateCycleUseCase };
