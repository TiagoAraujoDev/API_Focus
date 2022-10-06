import { UsersTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUserstokensDTO {
  token: string;
  user_id: string;
  expires_date: Date;
}
interface IUsersTokensRepository {
  create(data: IUserstokensDTO): Promise<UsersTokens>;
  delete(id: string): Promise<void>;
  findByUserIdAndToken(user_id: string, token: string): Promise<UsersTokens>;
}

export { IUsersTokensRepository, IUserstokensDTO };
