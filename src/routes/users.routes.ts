import { Router } from "express";

import createUserController from "../modules/useCases/CreateUser";

const userRoutes = Router();

userRoutes.post("/", (request, response) => {
  return createUserController().handle(request, response);
});

export { userRoutes };
