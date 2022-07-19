import { Task } from "../../entities/Task";
import {
  ICreateTaskDTO,
  ITasksRepository,
} from "../../repositories/ITasksRepository";

class CreateTaskUseCase {
  constructor(private taskRepository: ITasksRepository) {}

  execute({ title }: ICreateTaskDTO): Task {
    const task = this.taskRepository.create({ title });

    if (!task) {
      throw new Error("Unexpected error!");
    }

    return task;
  }
}

export { CreateTaskUseCase };
