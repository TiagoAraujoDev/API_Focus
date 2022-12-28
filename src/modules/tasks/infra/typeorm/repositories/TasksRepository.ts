import { Equal, Repository } from "typeorm";

import { appDataSource } from "../../../../../shared/infra/typeorm";
import { ICreateTaskDTO } from "../../../dtos/ICreateTaskDTO";
import { ITasksRepository } from "../../../repositories/ITasksRepository";
import { Task } from "../entities/Task";

class TasksRepository implements ITasksRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = appDataSource.getRepository(Task);
  }
  async findById(id: string): Promise<Task> {
    const task = await this.repository.findOneBy({ id });

    return task;
  }

  async create({ title, user_id }: ICreateTaskDTO): Promise<void> {
    const newTask = this.repository.create({
      title,
      user_id,
    });

    await this.repository.save(newTask);
  }

  async list(): Promise<Task[]> {
    const tasks = await this.repository.find({
      relations: ["user"],
    });

    return tasks;
  }

  async listTasksByUserId(user_id: string): Promise<Task[]> {
    const userTasks = await this.repository.findBy({
      user_id: Equal(user_id),
    });

    return userTasks;
  }

  async checkTask(task: Task): Promise<Task> {
    await this.repository.save(task);

    return task;
  }

  async removeTask(id: string): Promise<void> {
    const task = await this.repository.findOneBy({ id });

    await this.repository.remove(task);
  }
}

export { TasksRepository };
