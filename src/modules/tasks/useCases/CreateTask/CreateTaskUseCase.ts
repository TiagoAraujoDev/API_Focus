import { inject, injectable } from "tsyringe";

import {
  ICreateTaskDTO,
  ITasksRepository,
} from "../../repositories/ITasksRepository";

@injectable()
class CreateTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private taskRepository: ITasksRepository
  ) {}

  async execute({ title, user_id }: ICreateTaskDTO): Promise<void> {
    await this.taskRepository.create({ title, user_id });
  }
}

export { CreateTaskUseCase };
