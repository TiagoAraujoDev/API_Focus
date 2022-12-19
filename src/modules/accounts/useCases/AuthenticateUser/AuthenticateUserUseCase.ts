import { compare } from "bcryptjs";
import dayjs from "dayjs";
import { sign } from "jsonwebtoken";
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
  refresh_token: string;
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

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password is incorrect!");
    }

    const token = sign({}, process.env.JWT_TOKEN_SECRET, {
      subject: user.id,
      expiresIn: "1d",
    });

    const refreshToken = sign({ email }, process.env.JWT_REFRESH_TOKEN_SECRET, {
      subject: user.id,
      expiresIn: "30d",
    });

    const expires_date_time = dayjs().add(30, "day").toDate();

    await this.usersTokensRepository.create({
      refresh_token: refreshToken,
      user_id: user.id,
      expires_date: expires_date_time,
    });

    const userToken: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token: refreshToken,
    };

    return userToken;
  }
}

export { AuthenticateUserUseCase };
