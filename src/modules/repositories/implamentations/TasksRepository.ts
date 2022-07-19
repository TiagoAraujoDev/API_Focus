import { Repository } from "typeorm";

import { appDataSource } from "../../../database";
import { Task } from "../../entities/Task";
import { ICreateTaskDTO, ITasksRepository } from "../ITasksRepository";

class TasksRepository implements ITasksRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = appDataSource.getRepository(Task);
  }

  async create({ title }: ICreateTaskDTO): Promise<void> {
    const newTask = this.repository.create({
      title,
    });

    this.repository.save(newTask);
  }

  async list(): Promise<Task[]> {
    const tasks = await this.repository.find();

    return tasks;
  }

  async checkTask(task_id: string): Promise<Task> {
    const task = await this.repository.findOneBy({ task_id });

    task.done = true;

    return task;
  }
  async removeTask(task_id: string): Promise<void> {
    const task = await this.repository.findOneBy({ task_id });

    this.repository.remove(task);
  }
  async findById(task_id: string): Promise<Task> {
    const task = await this.repository.findOne({ task_id });

    return task;
  }
}

export { TasksRepository };
