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
    const deletedTask = await this.tasksRepository.removeTask(id);

    if (!deletedTask) {
      throw new AppError("Task doesn't exist!");
    }
  }
}

export { DeleteTaskUseCase };
