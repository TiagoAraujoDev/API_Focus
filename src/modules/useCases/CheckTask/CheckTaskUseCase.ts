import { Task } from "../../model/Task";
import { ITasksRepository } from "../../repositories/ITasksRepository";

class CheckTaskUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  execute(task_id: string): Task {
    const taskChecked = this.tasksRepository.checkTask(task_id);

    if (!taskChecked) {
      throw new Error("This Task doesn't exist!");
    }

    return taskChecked;
  }
}

export { CheckTaskUseCase };
