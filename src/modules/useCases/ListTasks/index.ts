import { TasksRepository } from "../../repositories/implamentations/TasksRepository";
import { ListAllTasksController } from "./ListAllTasksController";
import { ListAllTasksUseCase } from "./ListAllTasksUseCase";

export default (): ListAllTasksController => {
  const tasksRepository = new TasksRepository();
  const listAllTasksUseCase = new ListAllTasksUseCase(tasksRepository);
  const listAllTasksController = new ListAllTasksController(
    listAllTasksUseCase
  );
  return listAllTasksController;
};
