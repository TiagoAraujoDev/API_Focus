import { hash } from "bcryptjs";

import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async execute({ name, username, password, email }): Promise<User> {
    const userAreadyExist = await this.usersRepository.findByEmail(email);

    if (userAreadyExist) {
      throw new AppError("Email already registered!");
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      username,
      password: passwordHash,
      email,
    });

    return user;
  }
}

export { CreateUserUseCase };
