import { Task } from "../model/Task";

interface ICreateTaskDTO {
  title: string;
}
interface ITasksRepository {
  create({ title }: ICreateTaskDTO): Task;
  list(): Task[];
  checkTask(task_id: string): Task;
  removeTask(task_id: string): void;
  findById(task_id: string): Task;
}
export { ITasksRepository, ICreateTaskDTO };
