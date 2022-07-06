import { TasksRepository } from "../../repositories/implamentations/TasksRepository";
import { ListAllTasksController } from "./ListAllTasksController";
import { ListAllTasksUseCase } from "./ListAllTasksUseCase";

const tasksRepository = TasksRepository.getInstance();
const listAllTasksUseCase = new ListAllTasksUseCase(tasksRepository);
const listAllTasksController = new ListAllTasksController(listAllTasksUseCase);

export { listAllTasksController };
