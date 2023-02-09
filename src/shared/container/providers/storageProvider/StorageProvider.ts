import fsPromise from "node:fs/promises";
import path from "node:path";

import { multerConfig } from "../../../../config/multer";
import { IStorageProvider } from "./IStorageProvider";

class StorageProvider implements IStorageProvider {
  async get(file: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async save(file: string): Promise<void> {
    const filePath = path.resolve(multerConfig.tempFolder, file);
    const fileContent = await fsPromise.readFile(filePath);
    console.log(fileContent);

    // save in s3
  }

  async delete(file: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { StorageProvider };
