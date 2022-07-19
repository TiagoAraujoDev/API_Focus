import { Router } from "express";

import checkTaskController from "../modules/useCases/CheckTask";
import createTaskController from "../modules/useCases/CreateTask";
import deleteTaskController from "../modules/useCases/DeleteTask";
import listAllTasksController from "../modules/useCases/ListTasks";

const tasksRoutes = Router();

tasksRoutes.post("/", (request, response) => {
  return createTaskController().handle(request, response);
});

tasksRoutes.get("/", (request, response) => {
  return listAllTasksController().handle(request, response);
});

tasksRoutes.put("/", (request, response) => {
  return checkTaskController().handle(request, response);
});

tasksRoutes.delete("/", (request, response) => {
  return deleteTaskController().handle(request, response);
});

export { tasksRoutes };
