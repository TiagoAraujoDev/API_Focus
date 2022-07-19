import { TasksRepository } from "../../repositories/implamentations/TasksRepository";
import { CheckTaskController } from "./CheckTaskController";
import { CheckTaskUseCase } from "./CheckTaskUseCase";

export default (): CheckTaskController => {
  const tasksRepository = new TasksRepository();
  const checkTaskUseCase = new CheckTaskUseCase(tasksRepository);
  const checkTaskController = new CheckTaskController(checkTaskUseCase);
  return checkTaskController;
};
