import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}

interface IResponse {
  token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(refresh_token: string): Promise<IResponse> {
    const { sub: user_id } = verify(
      refresh_token,
      process.env.JWT_REFRESH_TOKEN_SECRET
    ) as IPayload;

    const refreshToken = await this.usersTokensRepository.findByUserIdAndToken(
      user_id,
      refresh_token
    );
    if (refreshToken?.refresh_token !== refresh_token) {
      throw new AppError("Invalid Token!", 403);
    }

    const newToken = sign({}, process.env.JWT_TOKEN_SECRET, {
      subject: user_id,
      expiresIn: "1d",
    });

    const response: IResponse = {
      token: newToken,
    };
    return response;
  }
}

export { RefreshTokenUseCase };
