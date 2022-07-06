import { Task } from "../../model/Task";
import { TasksRepository } from "../../repositories/implamentations/TasksRepository";

interface IRequest {
  title: string;
}

class CreateTaskUseCase {
  constructor(private taskRepository: TasksRepository) {}
  execute({ title }: IRequest): Task {
    const task = this.taskRepository.create({ title });
    if (!task) {
      throw new Error("Unespected error!");
    }
    return task;
  }
}
export { CreateTaskUseCase };
