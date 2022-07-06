import { Router } from "express";

import { tasksRoutes } from "./tasks.route";

const router = Router();

router.use("/tasks", tasksRoutes);

export { router };
