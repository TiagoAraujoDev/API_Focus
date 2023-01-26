import { Cycle } from "../infra/typeorm/entities/Cycle";

export interface ICreateCycleDTO {
  task: string;
  minutesAmount: number;
  startDate: Date;
  user_id: string;
}

interface ICyclesRepository {
  create(cycle: ICreateCycleDTO): Promise<Cycle>;
}

export { ICyclesRepository };
