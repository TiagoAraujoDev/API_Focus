import { Task } from "../../model/Task";
import { TasksRepository } from "../../repositories/implamentations/TasksRepository";

class CheckTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}
  execute(task_id: string): Task {
    const taskChecked = this.tasksRepository.checkTask(task_id);
    if (!taskChecked) {
      throw new Error("This Task doesn't exist!");
    }
    return taskChecked;
  }
}

export { CheckTaskUseCase };
