import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { UploadAvatarImageUseCase } from "./UploadAvatarImageUseCase";

class UploadAvatarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    // TODO:
    const { id: user_id } = request.headers;
    const { file } = request;

    if (!user_id) {
      throw new AppError("Missing user id!");
    }

    if (Array.isArray(user_id)) {
      throw new AppError("Too many ids sent!");
    }

    const uploadAvatarImageUseCase = container.resolve(
      UploadAvatarImageUseCase
    );
    await uploadAvatarImageUseCase.execute(file, user_id);

    return response.status(201).json({ message: "ok" });
  }
}

export { UploadAvatarImageController };
