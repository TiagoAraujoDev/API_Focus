import { TasksRepository } from "../../repositories/implamentations/TasksRepository";
import { DeleteTaskController } from "./DeleteTaskController";
import { DeleteTaskUseCase } from "./DeleteTaskUseCase";

export default (): DeleteTaskController => {
  const tasksRepository = new TasksRepository();
  const deleteTaskUseCase = new DeleteTaskUseCase(tasksRepository);
  const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);
  return deleteTaskController;
};
