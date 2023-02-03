import { Router } from "express";

import { CreateCycleController } from "../../../../modules/cycles/useCases/CreateCycle/CreateCycleController";
import { FinishCycleController } from "../../../../modules/cycles/useCases/FinishCycle/FinishCycleController";
import { InterruptCycleController } from "../../../../modules/cycles/useCases/InterruptCycle/InterruptCycleController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const cycleRoutes = Router();

const createCycleController = new CreateCycleController();
const interruptCycleController = new InterruptCycleController();
const finishCycleController = new FinishCycleController();

cycleRoutes.use(ensureAuthenticated);

cycleRoutes.post("/", createCycleController.handle);
cycleRoutes.patch("/cycle/interrupt", interruptCycleController.handle);
cycleRoutes.patch("/cycle/finish", finishCycleController.handle);
cycleRoutes.delete("/cycle");
cycleRoutes.get("/");

export { cycleRoutes };
