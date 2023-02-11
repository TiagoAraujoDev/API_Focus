import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fsPromise from "node:fs/promises";
import path from "node:path";

import { multerConfig } from "../../../infra/http/config/multer/multerConfig";
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
    const getParams: GetObjectCommandInput = {
      Bucket: bucketName,
      Key: file,
    };
    const getCommand = new GetObjectCommand(getParams);
    const url = await getSignedUrl(this.s3, getCommand, {
      expiresIn: 3600 * 24,
    });

    return url;
  }

  async save(file: string, mimeType: string): Promise<void> {
    const filePath = path.resolve(multerConfig.tempFolder, file);
    const fileContent = await fsPromise.readFile(filePath);

    const putParams: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: file,
      Body: fileContent,
      ContentType: mimeType,
    };
    const putCommand = new PutObjectCommand(putParams);
    await this.s3.send(putCommand);

    await fsPromise.unlink(filePath);
  }

  async delete(file: string): Promise<void> {
    const deleteParams: DeleteObjectCommandInput = {
      Bucket: bucketName,
      Key: file,
    };
    const deleteCommand = new DeleteObjectCommand(deleteParams);
    await this.s3.send(deleteCommand);
  }
}

export { StorageProvider };
