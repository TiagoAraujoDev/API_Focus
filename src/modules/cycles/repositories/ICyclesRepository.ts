import { Cycle } from "../infra/typeorm/entities/Cycle";

export interface ICreateCycleDTO {
  task: string;
  minutesAmount: number;
  startDate: Date;
  user_id: string;
}

interface ICyclesRepository {
  create(cycle: ICreateCycleDTO): Promise<Cycle>;
  interrupt(id: string): Promise<void>;
  finish(id: string): Promise<void>;
  findById(id: string): Promise<Cycle>;
  getAll(): Promise<Cycle[]>;
}

export { ICyclesRepository };
