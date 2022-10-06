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
    token,
  }: IUserstokensDTO): Promise<UsersTokens> {
    const userToken = this.repository.create({
      user_id,
      token,
      expires_date,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByUserIdAndToken(
    user_id: string,
    token: string
  ): Promise<UsersTokens> {
    const userToken = await this.repository.findOne({
      where: {
        user_id,
        token,
      },
    });

    return userToken;
  }
}

export { UsersTokensRepository };
