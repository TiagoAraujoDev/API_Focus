import { Router } from "express";

import { tasksRoutes } from "./tasks.routes";
import { userRoutes } from "./users.routes";

const router = Router();

router.use("/tasks", tasksRoutes);
router.use("/users", userRoutes);

export { router };
