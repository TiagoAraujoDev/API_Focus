import { TasksRepository } from "../../repositories/implamentations/TasksRepository";
import { CreateTaskController } from "./CreateTaskController";
import { CreateTaskUseCase } from "./CreateTaskUseCase";

const tasksRepository = TasksRepository.getInstance();
const createTaskUseCase = new CreateTaskUseCase(tasksRepository);
const createTaskController = new CreateTaskController(createTaskUseCase);

export { createTaskController };
