import { Router } from "express";

import authenticateUserController from "../modules/useCases/AuthenticateUser";
import createUserController from "../modules/useCases/CreateUser";

const userRoutes = Router();

userRoutes.post("/", (request, response) => {
  return createUserController().handle(request, response);
});
userRoutes.post("/login", (request, response) => {
  return authenticateUserController().handle(request, response);
});

export { userRoutes };
