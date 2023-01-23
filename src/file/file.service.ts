import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entity/file.entity';
import { Repository } from 'typeorm';
import writeFile from '../../middlewares/writeFile';
import readFile from '../../middlewares/readFile';
import deleteFile from '../../middlewares/deleteFile';
import * as path from 'path';
const savePath = path.join(__dirname, '../../data/');

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async getOne(name, res): Promise<StreamableFile> {
    const file = await this.fileRepository.findOne({
      where: { name: name },
    });

    if (!file) throw new NotFoundException('file not found');

    return await readFile(name, res, file);
  }

  async getOneInfo(name): Promise<FileEntity | string> {
    return await this.fileRepository.findOne({
      where: { name: name },
    });
  }

  async createOne(
    file: Express.Multer.File,
    name,
  ): Promise<
    | ({
        path: string;
        size: number;
        name: string;
        mimeType: string;
      } & FileEntity)
    | string
  > {
    const newFile = await this.fileRepository.save({
      path: savePath + name,
      name: name,
      mimeType: file.mimetype,
      size: file.size,
    });
    await writeFile(name, file.buffer);
    return newFile;
  }

  async deleteOne(name): Promise<FileEntity | string> {
    const file = await this.fileRepository.findOne({
      where: { name: name },
    });

    if (!file) throw new NotFoundException('file not found');

    await deleteFile(name);
    return 'Successfully deleted ' + name;
  }
}
