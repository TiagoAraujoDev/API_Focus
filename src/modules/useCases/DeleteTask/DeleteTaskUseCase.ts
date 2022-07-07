import { TasksRepository } from "../../repositories/implamentations/TasksRepository";

class DeleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}
  execute(task_id: string): void {
    const taskExist = this.tasksRepository.findById(task_id);
    if (!taskExist) {
      throw new Error("Task doesn't exist!");
    }
    this.tasksRepository.removeTask(task_id);
  }
}

export { DeleteTaskUseCase };
