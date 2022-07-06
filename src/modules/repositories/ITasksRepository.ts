import { Task } from "../model/Task";

interface ICreateTaskDTO {
  title: string;
}
interface ITasksRepository {
  create({ title }: ICreateTaskDTO): Task;
  list(): Task[];
  modify(task_id: string): Task;
  remove(task_id: string): void;
}
export { ITasksRepository, ICreateTaskDTO };
