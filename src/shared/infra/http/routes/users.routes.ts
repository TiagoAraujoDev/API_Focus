import { Router } from "express";
import multer from "multer";

import { multerConfig } from "../../../../config/multer";
import { AuthenticateUserController } from "../../../../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";
import { CreateUserController } from "../../../../modules/accounts/useCases/CreateUser/CreateUserController";
import { GetUserController } from "../../../../modules/accounts/useCases/GetUser/GetUserController";
import { ListUsersController } from "../../../../modules/accounts/useCases/ListUsers/ListUsersController";
import { RefreshTokenController } from "../../../../modules/accounts/useCases/RefreshToken/RefreshTokenController";
import { UploadAvatarImageController } from "../../../../modules/accounts/useCases/UploadAvatarImage/UploadAvatarImageController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const listUsersController = new ListUsersController();
const uploadAvatarImageController = new UploadAvatarImageController();
const getUserController = new GetUserController();

const upload = multer(multerConfig);

userRoutes.post("/", createUserController.handle);
userRoutes.post("/login", authenticateUserController.handle);
userRoutes.post("/refresh-token", refreshTokenController.handle);
userRoutes.get("/", listUsersController.handle);
userRoutes.get("/user", ensureAuthenticated, getUserController.handle);

userRoutes.post(
  "/avatar",
  upload.single("avatar"),
  uploadAvatarImageController.handle
);

export { userRoutes };
