import { Repository } from "typeorm";

import { appDataSource } from "../../../../../shared/infra/typeorm";
import {
  IUserstokensDTO,
  IUsersTokensRepository,
} from "../../../repositories/IUsersTokensRepository";
import { UsersTokens } from "../entities/UsersTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>;

  constructor() {
    this.repository = appDataSource.getRepository(UsersTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: IUserstokensDTO): Promise<UsersTokens> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByUserId(user_id: string): Promise<UsersTokens> {
    const refreshToken = await this.repository.findOneBy({ user_id });

    return refreshToken;
  }

  async findByUserIdAndToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens> {
    const userToken = await this.repository.findOne({
      where: {
        user_id,
        refresh_token,
      },
    });

    return userToken;
  }
}

export { UsersTokensRepository };
