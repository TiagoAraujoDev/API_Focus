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
    id: string;
    email: string;
  };
  refreshToken: string;
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
    if (!email || !password) {
      throw new AppError("Email and password are required!");
    }

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

    const oldRefreshToken = await this.usersTokensRepository.findByUserId(
      user.id
    );
    if (oldRefreshToken) {
      await this.usersTokensRepository.delete(oldRefreshToken?.id);
    }
    await this.usersTokensRepository.create({
      refresh_token: refreshToken,
      user_id: user.id,
      expires_date: expires_date_time,
    });

    const userToken: IResponse = {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
      refreshToken,
    };

    return userToken;
  }
}

export { AuthenticateUserUseCase };
