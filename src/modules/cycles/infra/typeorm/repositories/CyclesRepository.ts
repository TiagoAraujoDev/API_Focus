import { Repository } from "typeorm";

import { appDataSource } from "../../../../../shared/infra/typeorm";
import {
  ICreateCycleDTO,
  ICyclesRepository,
} from "../../../repositories/ICyclesRepository";
import { Cycle } from "../entities/Cycle";

class CyclesRepository implements ICyclesRepository {
  private repository: Repository<Cycle>;

  constructor() {
    this.repository = appDataSource.getRepository(Cycle);
  }

  async create({
    task,
    minutesAmount,
    startDate,
    user_id,
  }: ICreateCycleDTO): Promise<Cycle> {
    const cycle = this.repository.create({
      task,
      minutesAmount,
      startDate,
      user_id,
    });

    await this.repository.save(cycle);

    return cycle;
  }

  async interrupt(id: string): Promise<void> {
    const cycle = await this.repository.findOne({
      where: {
        id,
      },
    });

    cycle.interruptedDate = new Date();

    await this.repository.save(cycle);
  }
}

export { CyclesRepository };
