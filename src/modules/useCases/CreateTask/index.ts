import { TasksRepository } from "../../repositories/implamentations/TasksRepository";
import { CreateTaskController } from "./CreateTaskController";
import { CreateTaskUseCase } from "./CreateTaskUseCase";

const taskRepository = TasksRepository.getInstance();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const createTaskController = new CreateTaskController(createTaskUseCase);

export { createTaskController };
