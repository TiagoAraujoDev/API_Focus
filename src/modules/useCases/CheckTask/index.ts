import { TasksRepository } from "../../repositories/implamentations/TasksRepository";
import { CheckTaskController } from "./CheckTaskController";
import { CheckTaskUseCase } from "./CheckTaskUseCase";

const tasksRepository = TasksRepository.getInstance();
const checkTaskUseCase = new CheckTaskUseCase(tasksRepository);
const checkTaskController = new CheckTaskController(checkTaskUseCase);

export { checkTaskController };
