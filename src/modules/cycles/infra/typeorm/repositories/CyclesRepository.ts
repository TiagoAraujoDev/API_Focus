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
}

export { CyclesRepository };
