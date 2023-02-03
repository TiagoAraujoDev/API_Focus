import { Router } from "express";

import { CreateCycleController } from "../../../../modules/cycles/useCases/CreateCycle/CreateCycleController";
import { DeleteCycleController } from "../../../../modules/cycles/useCases/DeleteCycle/DeleteCycleController";
import { FinishCycleController } from "../../../../modules/cycles/useCases/FinishCycle/FinishCycleController";
import { InterruptCycleController } from "../../../../modules/cycles/useCases/InterruptCycle/InterruptCycleController";
import { ListCyclesController } from "../../../../modules/cycles/useCases/ListCycles/ListCyclesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const cycleRoutes = Router();

const createCycleController = new CreateCycleController();
const interruptCycleController = new InterruptCycleController();
const finishCycleController = new FinishCycleController();
const listCyclesController = new ListCyclesController();
const deleteCycleController = new DeleteCycleController();

cycleRoutes.use(ensureAuthenticated);

cycleRoutes.post("/", createCycleController.handle);
cycleRoutes.patch("/cycle/interrupt", interruptCycleController.handle);
cycleRoutes.patch("/cycle/finish", finishCycleController.handle);
cycleRoutes.delete("/cycle", deleteCycleController.handle);
cycleRoutes.get("/", listCyclesController.handle);

export { cycleRoutes };
