import { ITasksRepository } from "../../repositories/ITasksRepository";

interface IRequest {
  id: string;
}
class DeleteTaskUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    const deletedTask = await this.tasksRepository.removeTask(id);

    if (!deletedTask) {
      throw new Error("Task doesn't exist!");
    }
  }
}

export { DeleteTaskUseCase };
