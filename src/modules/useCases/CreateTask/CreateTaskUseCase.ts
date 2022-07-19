import {
  ICreateTaskDTO,
  ITasksRepository,
} from "../../repositories/ITasksRepository";

class CreateTaskUseCase {
  constructor(private taskRepository: ITasksRepository) {}

  async execute({ title }: ICreateTaskDTO): Promise<void> {
    await this.taskRepository.create({ title });
  }
}

export { CreateTaskUseCase };
