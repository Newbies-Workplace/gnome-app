import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as Minio from "minio";

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get("MINIO_ENDPOINT"),
      port: Number(this.configService.get("MINIO_PORT")),
      useSSL: this.configService.get("MINIO_USE_SSL") === "true",
      accessKey: this.configService.get("MINIO_ACCESS_KEY"),
      secretKey: this.configService.get("MINIO_SECRET_KEY"),
    });
    this.bucketName = this.configService.get("MINIO_BUCKET_NAME");
  }

  async createBucketIfNotExists() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      const policy = {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: { AWS: ["*"] },
            Action: ["s3:GetObject", "s3:PutObject"],
            Resource: [`arn:aws:s3:::${this.bucketName}/*`],
          },
        ],
      };
      await this.minioClient.makeBucket(this.bucketName, "eu-west-1");
      await this.minioClient.setBucketPolicy(
        this.bucketName,
        JSON.stringify(policy),
      );
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    fileNameString: string,
    catalogueName: string,
  ) {
    if (!file) {
      return { fileName: null };
    }
    const fileName = `${fileNameString}`;
    const filePath = `${catalogueName}/${fileNameString}`;
    await this.minioClient.putObject(
      this.bucketName,
      filePath,
      file.buffer,
      file.size,
      {
        "Content-Type": file.mimetype,
      },
    );

    return { fileName: fileName, filePath: filePath };
  }

  async getFileUrl(filePath: string) {
    const presignedURL = await this.minioClient.presignedUrl(
      "GET",
      this.bucketName,
      filePath,
    );
    const URLArray = presignedURL.split("?");

    return URLArray[0];
  }
  async deleteFile(bucketName: string, objectName: string) {
    await this.minioClient.removeObject(bucketName, objectName);
  }
}
