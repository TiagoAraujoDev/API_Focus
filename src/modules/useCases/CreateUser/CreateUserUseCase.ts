import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async execute({ name, username, password, email }): Promise<User> {
    const user = await this.usersRepository.create({
      name,
      username,
      password,
      email,
    });

    return user;
  }
}

export { CreateUserUseCase };
