import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";
import { CreateUserController } from "../../../../modules/accounts/useCases/CreateUser/CreateUserController";
import { ListUsersController } from "../../../../modules/accounts/useCases/ListUsers/ListUsersController";
import { RefreshTokenController } from "../../../../modules/accounts/useCases/RefreshToken/RefreshTokenController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const listUsersController = new ListUsersController();

userRoutes.post("/", createUserController.handle);
userRoutes.post("/login", authenticateUserController.handle);
userRoutes.post("/refresh-token", refreshTokenController.handle);
userRoutes.get("/", listUsersController.handle);

export { userRoutes };
