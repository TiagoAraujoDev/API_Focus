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
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new AppError("This Task doesn't exist!");
    }
    task.done = !task.done;
    const checkedTask = await this.tasksRepository.checkTask(task);

    return checkedTask;
  }
}

export { CheckTaskUseCase };
