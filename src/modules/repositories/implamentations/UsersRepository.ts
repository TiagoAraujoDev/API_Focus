import { Repository } from "typeorm";

import { appDataSource } from "../../../database";
import { User } from "../../entities/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
  }

  async create({
    name,
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      username,
      email,
      password,
    });

    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
