import { ICreateTaskDTO } from "../dtos/ICreateTaskDTO";
import { Task } from "../infra/typeorm/entities/Task";

interface ITasksRepository {
  findById(id: string): Promise<Task>;
  create({ title, user_id }: ICreateTaskDTO): Promise<void>;
  list(): Promise<Task[]>;
  checkTask(task: Task): Promise<Task>;
  removeTask(task_id: string): Promise<void>;
  listTasksByUserId(user_id: string): Promise<Task[]>;
}
export { ITasksRepository };
