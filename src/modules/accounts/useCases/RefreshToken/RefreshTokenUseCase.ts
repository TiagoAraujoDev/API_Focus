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
  user: {
    email: string;
  };
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) {}
  async execute(refresh_token: string): Promise<IResponse> {
    const { email, sub: user_id } = verify(
      refresh_token,
      process.env.JWT_REFRESH_TOKEN_SECRET
    ) as IPayload;

    const userToken = await this.usersTokensRepository.findByUserIdAndToken(
      user_id,
      refresh_token
    );

    if (!userToken) {
      throw new AppError("Token does not exist!");
    }

    const newToken = sign({}, process.env.JWT_TOKEN_SECRET, {
      subject: user_id,
      expiresIn: "1d",
    });

    const response: IResponse = {
      token: newToken,
      user: {
        email,
      },
    };

    return response;
  }
}

export { RefreshTokenUseCase };
