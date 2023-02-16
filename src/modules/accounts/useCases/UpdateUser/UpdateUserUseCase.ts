import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";

interface IUserUpdateInfo {
  username: string;
  email: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute(
    user_id: string,
    { username, email }: IUserUpdateInfo
  ): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found!", 404);
    }

    user.username = username || user.username;
    user.email = email || user.email;

    this.usersRepository.update(user);
  }
}

export { UpdateUserUseCase };
