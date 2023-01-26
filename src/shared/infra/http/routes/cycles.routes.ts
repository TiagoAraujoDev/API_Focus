import { Router } from "express";

import { CreateCycleController } from "../../../../modules/cycles/useCases/CreateCycle/CreateCycleController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const cycleRoutes = Router();

const createCycleController = new CreateCycleController();

cycleRoutes.use(ensureAuthenticated);

cycleRoutes.post("/", createCycleController.handle);

export { cycleRoutes };
