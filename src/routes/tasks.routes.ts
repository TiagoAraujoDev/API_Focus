import { Router } from "express";

import CheckTaskController from "../modules/useCases/CheckTask";
import { createTaskController } from "../modules/useCases/CreateTask";
import { deleteTaskController } from "../modules/useCases/DeleteTask";
import { listAllTasksController } from "../modules/useCases/ListTasks";

const tasksRoutes = Router();

const checkTaskController = CheckTaskController();

tasksRoutes.post("/", (request, response) => {
  return createTaskController.handle(request, response);
});

tasksRoutes.get("/", (request, response) => {
  return listAllTasksController.handle(request, response);
});

tasksRoutes.put("/", checkTaskController.handle);

tasksRoutes.delete("/:task_id", (request, response) => {
  return deleteTaskController.handle(request, response);
});

export { tasksRoutes };
