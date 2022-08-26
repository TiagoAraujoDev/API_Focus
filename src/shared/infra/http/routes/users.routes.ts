import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";
import { CreateUserController } from "../../../../modules/accounts/useCases/CreateUser/CreateUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.post("/login", authenticateUserController.handle);

export { userRoutes };
