import dayjs from "dayjs";
import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { UsersTokens } from "../../infra/typeorm/entities/UsersTokens";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(token: string): Promise<UsersTokens> {
    // TODO Move secret to .env
    const { email, sub: user_id } = verify(
      token,
      "60aa9604807343718f0dad07ad10681f"
    ) as IPayload;

    const userToken = await this.usersTokensRepository.findByUserIdAndToken(
      user_id,
      email
    );

    if (!userToken) {
      throw new AppError("Token does not exist!");
    }

    await this.usersTokensRepository.delete(userToken.id);

    const refreshToken = sign({ email }, "60aa9604807343718f0dad07ad10681f", {
      subject: user_id,
      expiresIn: "1d",
    });

    const expires_date_time = dayjs().add(1, "day").toDate();

    const newToken = this.usersTokensRepository.create({
      user_id,
      token: refreshToken,
      expires_date: expires_date_time,
    });

    return newToken;
  }
}

export { RefreshTokenUseCase };
