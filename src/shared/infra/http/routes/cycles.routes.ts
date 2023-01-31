import { Router } from "express";

import { CreateCycleController } from "../../../../modules/cycles/useCases/CreateCycle/CreateCycleController";
import { InterruptCycleController } from "../../../../modules/cycles/useCases/InterruptCycle/InterruptCycleController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const cycleRoutes = Router();

const createCycleController = new CreateCycleController();
const interruptCycleController = new InterruptCycleController();

cycleRoutes.use(ensureAuthenticated);

cycleRoutes.post("/", createCycleController.handle);
cycleRoutes.patch("/interrupt", interruptCycleController.handle);

export { cycleRoutes };
