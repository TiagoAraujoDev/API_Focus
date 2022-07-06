import { Task } from "../../model/Task";
import { TasksRepository } from "../../repositories/implamentations/TasksRepository";

interface IRequest {
  title: string;
}

class CreateTaskUseCase {
  constructor(private taskRepository: TasksRepository) {}
  execute({ title }: IRequest): Task {
    const task = this.taskRepository.create({ title });
    return task;
  }
}
export { CreateTaskUseCase };
