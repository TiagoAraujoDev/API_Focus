import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { Task } from "../../infra/typeorm/entities/Task";
import { ITasksRepository } from "../../repositories/ITasksRepository";

@injectable()
class ListAllTasksUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository
  ) {}

  async execute(): Promise<Task[]> {
    const tasks = await this.tasksRepository.list();

    if (!tasks) {
      throw new AppError("Unexpected error!");
    }

    return tasks;
  }
}

export { ListAllTasksUseCase };
