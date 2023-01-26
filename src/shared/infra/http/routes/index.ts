import { Router } from "express";

import { cycleRoutes } from "./cycles.routes";
import { tasksRoutes } from "./tasks.routes";
import { userRoutes } from "./users.routes";

const router = Router();

router.use("/tasks", tasksRoutes);
router.use("/users", userRoutes);
router.use("/cycles", cycleRoutes);

export { router };
