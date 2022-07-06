import { Router } from "express";

import { createTaskController } from "../modules/useCases/CreateTask";

const tasksRoutes = Router();

tasksRoutes.post("/", (request, response) => {
  return createTaskController.handle(request, response);
});

tasksRoutes.get("/", (request, response) => {});

tasksRoutes.put("/", (request, response) => {});

tasksRoutes.delete("/", (request, response) => {});

export { tasksRoutes };
