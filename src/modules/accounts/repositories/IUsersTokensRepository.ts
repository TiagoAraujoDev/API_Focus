import { UsersTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUserstokensDTO {
  refresh_token: string;
  user_id: string;
  expires_date: Date;
}
interface IUsersTokensRepository {
  create(data: IUserstokensDTO): Promise<UsersTokens>;
  delete(id: string): Promise<void>;
  findByUserId(user_id: string): Promise<UsersTokens>;
  findByUserIdAndToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens>;
}

export { IUsersTokensRepository, IUserstokensDTO };
