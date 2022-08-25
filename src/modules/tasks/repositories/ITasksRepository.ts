import { Task } from "../infra/typeorm/entities/Task";

interface ICreateTaskDTO {
  title: string;
  user_id: string;
}

interface ITasksRepository {
  create({ title, user_id }: ICreateTaskDTO): Promise<void>;
  list(): Promise<Task[]>;
  checkTask(id: string): Promise<Task>;
  removeTask(task_id: string): Promise<Task>;
}
export { ITasksRepository, ICreateTaskDTO };
