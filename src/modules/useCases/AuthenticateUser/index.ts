import { UsersRepository } from "../../repositories/implamentations/UsersRepository";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export default (): AuthenticateUserController => {
  const userRepository = new UsersRepository();
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
  const authenticateUserController = new AuthenticateUserController(
    authenticateUserUseCase
  );

  return authenticateUserController;
};
