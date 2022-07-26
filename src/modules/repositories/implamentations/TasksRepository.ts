import { Repository } from "typeorm";

import { appDataSource } from "../../../database";
import { Task } from "../../entities/Task";
import { ICreateTaskDTO, ITasksRepository } from "../ITasksRepository";

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

  async checkTask(id: string): Promise<Task> {
    const task = await this.repository.findOneBy({ id });

    task.done = true;

    return task;
  }
  async removeTask(id: string): Promise<Task> {
    const task = await this.repository.findOneBy({ id });

    this.repository.remove(task);

    return task;
  }
}

export { TasksRepository };
