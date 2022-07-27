import { AppError } from "../../../errors/AppError";
import { ITasksRepository } from "../../repositories/ITasksRepository";

interface IRequest {
  id: string;
}
class DeleteTaskUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    const deletedTask = await this.tasksRepository.removeTask(id);

    if (!deletedTask) {
      throw new AppError("Task doesn't exist!");
    }
  }
}

export { DeleteTaskUseCase };
