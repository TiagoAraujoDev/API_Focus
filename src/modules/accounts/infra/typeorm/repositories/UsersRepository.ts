import { Repository } from "typeorm";

import { appDataSource } from "../../../../../shared/infra/typeorm";
import {
  ICreateUserDTO,
  IUsersRepository,
} from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

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

  async update(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.repository.findOneBy({ username });

    return user;
  }

  async listUsers(): Promise<User[]> {
    const users = await this.repository.find({
      relations: {
        tasks: true,
      },
    });

    return users;
  }
}

export { UsersRepository };
