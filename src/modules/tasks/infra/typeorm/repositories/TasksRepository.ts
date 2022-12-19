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

  async listTasksByUsers(user_id: string): Promise<Task[]> {
    const userTasks = await this.repository.findBy({
      user_id: Equal(user_id),
    });

    return userTasks;
  }

  async checkTask(id: string): Promise<Task> {
    const task = await this.repository.findOneBy({ id });

    task.done = !task.done;

    await this.repository.save(task);

    return task;
  }

  async removeTask(id: string): Promise<Task> {
    const task = await this.repository.findOneBy({ id });

    await this.repository.remove(task);

    return task;
  }
}

export { TasksRepository };
