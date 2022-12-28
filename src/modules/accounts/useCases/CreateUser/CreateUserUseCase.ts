import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../infra/typeorm/entities/User";
import {
  ICreateUserDTO,
  IUsersRepository,
} from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({
    name,
    username,
    password,
    email,
  }: ICreateUserDTO): Promise<User> {
    if (!name || !username || !password || !email) {
      throw new AppError("Name, username, password and email are required!");
    }

    const userAreadyExist = await this.usersRepository.findByEmail(email);
    if (userAreadyExist) {
      throw new AppError("Email already registered!", 409);
    }

    const duplicateUsername = await this.usersRepository.findByUsername(
      username
    );
    if (duplicateUsername) {
      throw new AppError("Username unavailable!");
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
