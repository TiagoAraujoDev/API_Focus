import { ITasksRepository } from "../../repositories/ITasksRepository";

class ListAllTasksUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  execute() {
    const tasks = this.tasksRepository.list();

    if (!tasks) {
      throw new Error("Unespected error!");
    }

    return tasks;
  }
}

export { ListAllTasksUseCase };
