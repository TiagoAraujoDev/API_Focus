import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ITasksRepository } from "../../repositories/ITasksRepository";

interface IRequest {
  id: string;
}

@injectable()
class DeleteTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new AppError("Task not found!");
    }

    await this.tasksRepository.removeTask(id);
  }
}

export { DeleteTaskUseCase };
