import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";

interface IRequest {
  email: string;
  password: string;
}

class AuthenticateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ email, password }: IRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password is incorrect!");
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password is incorrect!");
    }

    const token = jwt.sign(
      { id: user.id },
      "60aa9604807343718f0dad07ad10681f",
      {
        expiresIn: "1d",
      }
    );

    const { password: _, ...userLogin } = user;

    return {
      token,
      user: userLogin,
    };
  }
}

export { AuthenticateUserUseCase };
