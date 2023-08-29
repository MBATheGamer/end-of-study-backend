import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from "uuid";

@Controller('uploads')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor("image", {
    storage: diskStorage({
      destination: "./uploads",
      filename(_, file, callback) {
        return callback(null, `${uuid()}${extname(file.originalname)}`);
      }
    })
  }))
  public uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `http://localhost:3000/api/uploads/${file.filename}`
    };
  }

  @Get(":path")
  public async getImage(
    @Param("path") path: string,
    @Res() response: Response
  ) {
    response.sendFile(path, {
      root: "uploads"
    });
  }
}
