import { AppError } from "../../../errors/AppError";
import { Task } from "../../entities/Task";
import { ITasksRepository } from "../../repositories/ITasksRepository";

interface IRequest {
  id: string;
}

class CheckTaskUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute({ id }: IRequest): Promise<Task> {
    const taskChecked = await this.tasksRepository.checkTask(id);

    if (!taskChecked) {
      throw new AppError("This Task doesn't exist!");
    }

    return taskChecked;
  }
}

export { CheckTaskUseCase };
