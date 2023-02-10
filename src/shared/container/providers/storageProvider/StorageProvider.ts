import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3,
} from "@aws-sdk/client-s3";
import fsPromise from "node:fs/promises";
import path from "node:path";

import { multerConfig } from "../../../../config/multer";
import { IStorageProvider } from "./IStorageProvider";

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

class StorageProvider implements IStorageProvider {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey,
      },
      region: bucketRegion,
    });
  }

  async get(file: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async save(file: string, mimeType: string): Promise<void> {
    const filePath = path.resolve(multerConfig.tempFolder, file);
    const fileContent = await fsPromise.readFile(filePath);
    console.log(fileContent);

    // save in s3
    const putParams: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: file,
      Body: fileContent,
      ContentType: mimeType,
    };

    const putCommand = new PutObjectCommand(putParams);
    await this.s3.send(putCommand);
  }

  async delete(file: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { StorageProvider };
