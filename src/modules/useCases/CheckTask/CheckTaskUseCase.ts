import { Task } from "../../entities/Task";
import { ITasksRepository } from "../../repositories/ITasksRepository";

class CheckTaskUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute(task_id: string): Promise<Task> {
    const taskChecked = await this.tasksRepository.checkTask(task_id);

    if (!taskChecked) {
      throw new Error("This Task doesn't exist!");
    }

    return taskChecked;
  }
}

export { CheckTaskUseCase };
