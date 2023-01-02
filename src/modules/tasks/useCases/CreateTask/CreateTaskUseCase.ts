import { inject, injectable } from "tsyringe";

import { ICreateTaskDTO } from "../../dtos/ICreateTaskDTO";
import { Task } from "../../infra/typeorm/entities/Task";
import { ITasksRepository } from "../../repositories/ITasksRepository";

@injectable()
class CreateTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private taskRepository: ITasksRepository
  ) {}

  async execute({ title, user_id }: ICreateTaskDTO): Promise<Task> {
    const newTask = await this.taskRepository.create({ title, user_id });

    return newTask;
  }
}

export { CreateTaskUseCase };
