import { Task } from "../../entities/Task";
import { ITasksRepository } from "../../repositories/ITasksRepository";

class ListAllTasksUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute(): Promise<Task[]> {
    const tasks = await this.tasksRepository.list();

    if (!tasks) {
      throw new Error("Unespected error!");
    }

    return tasks;
  }
}

export { ListAllTasksUseCase };
