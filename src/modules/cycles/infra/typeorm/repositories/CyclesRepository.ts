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

  async finish(id: string): Promise<void> {
    const cycle = await this.repository.findOne({
      where: {
        id,
      },
    });

    cycle.finishedDate = new Date();

    await this.repository.save(cycle);
  }

  async findById(id: string): Promise<Cycle> {
    const cycle = await this.repository.findOne({
      where: {
        id,
      },
    });

    return cycle;
  }

  async getAll(): Promise<Cycle[]> {
    const cycles = await this.repository.find();

    return cycles;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { CyclesRepository };
