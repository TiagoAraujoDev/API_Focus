import { ITasksRepository } from "../../repositories/ITasksRepository";

class DeleteTaskUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  execute(task_id: string): void {
    const taskExist = this.tasksRepository.findById(task_id);

    if (!taskExist) {
      throw new Error("Task doesn't exist!");
    }

    this.tasksRepository.removeTask(task_id);
  }
}

export { DeleteTaskUseCase };
