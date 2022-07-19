import { Task } from "../model/Task";

interface ICreateTaskDTO {
  title: string;
}
interface ITasksRepository {
  create({ title }: ICreateTaskDTO): Promise<void>;
  list(): Promise<Task[]>;
  checkTask(task_id: string): Promise<Task>;
  removeTask(task_id: string): Promise<void>;
  findById(task_id: string): Promise<Task>;
}
export { ITasksRepository, ICreateTaskDTO };
