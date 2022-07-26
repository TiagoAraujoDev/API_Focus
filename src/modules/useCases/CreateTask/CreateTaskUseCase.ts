import {
  ICreateTaskDTO,
  ITasksRepository,
} from "../../repositories/ITasksRepository";

class CreateTaskUseCase {
  constructor(private taskRepository: ITasksRepository) {}

  async execute({ title, user_id }: ICreateTaskDTO): Promise<void> {
    await this.taskRepository.create({ title, user_id });
  }
}

export { CreateTaskUseCase };
