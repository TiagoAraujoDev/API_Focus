import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { Task } from "../../infra/typeorm/entities/Task";
import { ITasksRepository } from "../../repositories/ITasksRepository";

interface IRequest {
  id: string;
}

@injectable()
class CheckTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository
  ) {}

  async execute({ id }: IRequest): Promise<Task> {
    const taskChecked = await this.tasksRepository.checkTask(id);

    if (!taskChecked) {
      throw new AppError("This Task doesn't exist!");
    }

    return taskChecked;
  }
}

export { CheckTaskUseCase };
