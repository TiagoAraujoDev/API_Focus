import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadAvatarImageUseCase } from "./UploadAvatarImageUseCase";

class UploadAvatarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { file } = request;

    const uploadAvatarImageUseCase = container.resolve(
      UploadAvatarImageUseCase
    );
    await uploadAvatarImageUseCase.execute(file, user_id);

    return response.sendStatus(204);
  }
}

export { UploadAvatarImageController };
