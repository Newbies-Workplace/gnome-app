import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import * as mime from "mime-types";
import { StorageService } from "@/storage/storage.service";

@Controller("/v1/storage")
export class StorageController {
  constructor(readonly storageService: StorageService) {}

  @Get("assets/*")
  async getFile(@Param() params: any, @Res() res: Response) {
    const path = params[0];
    const stream = await this.storageService.getFileStream(path);
    const contentType = mime.lookup(path) || "application/octet-stream";
    res.setHeader("Content-Type", contentType);
    stream.pipe(res);
  }
}
