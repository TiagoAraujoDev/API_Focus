import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../../../shared/container/providers/storageProvider/IStorageProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";

@injectable()
class UploadAvatarImageUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute(file: Express.Multer.File, user_id: string): Promise<void> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("User not found!", 404);
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar);
    }

    await this.storageProvider.save(file.filename, file.mimetype);
    user.avatar = file.filename;
    await this.usersRepository.update(user);
  }
}

export { UploadAvatarImageUseCase };
