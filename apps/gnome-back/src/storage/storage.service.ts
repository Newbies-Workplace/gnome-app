import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as Minio from "minio";

export enum StorageDirectory {
  GNOME_IMAGES = "gnome-images",
  USER_IMAGES = "user-images",
}

@Injectable()
export class StorageService implements OnModuleInit {
  private minioClient: Minio.Client;

  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get("MINIO_ENDPOINT"),
      port: Number(this.configService.get("MINIO_PORT")),
      accessKey: this.configService.get("MINIO_ACCESS_KEY"),
      secretKey: this.configService.get("MINIO_SECRET_KEY"),
      useSSL: false,
    });

    this.bucketName = this.configService.get("MINIO_BUCKET_NAME");
  }

  async onModuleInit() {}

  async uploadFile(
    file: Express.Multer.File,
    fileName: string,
    directory: StorageDirectory,
  ) {
    const filePath = this.getPathForDirectory(directory, fileName);

    await this.minioClient.putObject(
      this.bucketName,
      filePath,
      file.buffer,
      file.size,
      {
        "Content-Type": file.mimetype,
      },
    );

    return { path: filePath };
  }

  async getFileStream(filePath: string) {
    return this.minioClient.getObject(this.bucketName, filePath);
  }

  async deleteFile(fileName: string, directory: StorageDirectory) {
    const filePath = this.getPathForDirectory(directory, fileName);

    await this.minioClient.removeObject(this.bucketName, filePath);
  }

  getPathForDirectory(directory: StorageDirectory, fileName: string) {
    return `${directory}/${fileName}`;
  }
}
