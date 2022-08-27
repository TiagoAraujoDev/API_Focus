import { inject, injectable } from "tsyringe";

import { Task } from "../../infra/typeorm/entities/Task";
import { ITasksRepository } from "../../repositories/ITasksRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class ListUserTasksUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<Task[]> {
    const userTasks = await this.tasksRepository.listTasksByUsers(user_id);

    return userTasks;
  }
}

export { ListUserTasksUseCase };
