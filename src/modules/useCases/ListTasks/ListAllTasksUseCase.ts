import { TasksRepository } from "../../repositories/implamentations/TasksRepository";

class ListAllTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}
  execute() {
    const tasks = this.tasksRepository.list();
    if (!tasks) {
      throw new Error("Unespected error!");
    }
    return tasks;
  }
}

export { ListAllTasksUseCase };
