import { inject, injectable } from "tsyringe";

import { User } from "../../infra/typeorm/entities/User";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: UsersRepository
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.listUsers();

    return users;
  }
}

export { ListUsersUseCase };
