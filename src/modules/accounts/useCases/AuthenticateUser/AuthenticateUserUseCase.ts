import bcryptjs from "bcryptjs";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password is incorrect!");
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password is incorrect!");
    }

    // TODO: move secret and expiresIn to .env
    const token = jwt.sign({ email }, "60aa9604807343718f0dad07ad10681f", {
      subject: user.id,
      expiresIn: "1d",
    });

    const expires_date_time = dayjs().add(1, "day").toDate();

    await this.usersTokensRepository.create({
      token,
      user_id: user.id,
      expires_date: expires_date_time,
    });

    // const { password: _, ...userLogin } = user;

    const userToken: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return userToken;
  }
}

export { AuthenticateUserUseCase };
