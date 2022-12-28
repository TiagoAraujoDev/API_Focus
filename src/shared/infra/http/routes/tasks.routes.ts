import { Router } from "express";

import { CheckTaskController } from "../../../../modules/tasks/useCases/CheckTask/CheckTaskController";
import { CreateTaskController } from "../../../../modules/tasks/useCases/CreateTask/CreateTaskController";
import { DeleteTaskController } from "../../../../modules/tasks/useCases/DeleteTask/DeleteTaskController";
import { ListAllTasksController } from "../../../../modules/tasks/useCases/ListTasks/ListAllTasksController";
import { ListUserTasksController } from "../../../../modules/tasks/useCases/ListUserTasks/ListUserTasksController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();
const listAllTasksController = new ListAllTasksController();
const checkTaskController = new CheckTaskController();
const deleteTaskController = new DeleteTaskController();
const listUserTasksController = new ListUserTasksController();

tasksRoutes.use(ensureAuthenticated);

tasksRoutes.post("/", createTaskController.handle);

tasksRoutes.get("/", listAllTasksController.handle);

tasksRoutes.get("/user", listUserTasksController.handle);

tasksRoutes.put("/", checkTaskController.handle);

tasksRoutes.delete("/", deleteTaskController.handle);

export { tasksRoutes };
