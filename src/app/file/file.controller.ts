import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileEntity } from '../../entity/file.entity';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async getOne(@Param('name') name): Promise<FileEntity | string> {
    return await this.fileService.getOne(name);
  }

  @Get('info')
  async getOneInfo(@Param('name') name): Promise<FileEntity | string> {
    return await this.fileService.getOneInfo(name);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createOne(
    @UploadedFile() file: Express.Multer.File,
    @Param('name') name,
  ): Promise<
    | ({
        path: string;
        size: number;
        name: string;
        mimeType: string;
      } & FileEntity)
    | string
  > {
    return await this.fileService.createOne(file, name);
  }

  @Delete()
  async deleteOne(@Param('name') name): Promise<FileEntity | string> {
    return await this.fileService.deleteOne(name);
  }
}
