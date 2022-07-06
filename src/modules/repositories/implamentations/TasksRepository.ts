import { Task } from "../../model/Task";
import { ICreateTaskDTO, ITasksRepository } from "../ITasksRepository";

class TasksRepository implements ITasksRepository {
  private tasks: Task[];

  private static INSTANCE: TasksRepository;

  private constructor() {
    this.tasks = [];
  }

  public static getInstance() {
    if (!TasksRepository.INSTANCE) {
      TasksRepository.INSTANCE = new TasksRepository();
    }
    return TasksRepository.INSTANCE;
  }

  create({ title }: ICreateTaskDTO): Task {
    const newTask = new Task(title);

    this.tasks.push(newTask);

    return newTask;
  }
  list(): Task[] {
    return this.tasks;
  }
  modify(task_id: string): Task {
    const task = this.tasks.find((task) => task.id === task_id);

    if (!task) {
      throw new Error("Task doesn't exist!");
    }

    task.done = true;
    task.updated_at = new Date();

    return task;
  }
  remove(task_id: string): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === task_id);

    if (taskIndex === -1) {
      throw new Error("Task doesn't exist!");
    }

    this.tasks.splice(taskIndex, 1);
  }
}

export { TasksRepository };
