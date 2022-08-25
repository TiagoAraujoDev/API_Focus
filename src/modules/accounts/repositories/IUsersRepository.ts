import { User } from "../infra/typeorm/entities/User";

interface ICreateUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface IUsersRepository {
  create({ name, username, email, password }: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository, ICreateUserDTO };
