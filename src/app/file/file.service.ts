import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../../entity/file.entity';
import { Repository } from 'typeorm';
import writeFile from '../../../middlewares/writeFile';
import readFile from '../../../middlewares/readFile';
import deleteFile from '../../../middlewares/deleteFile';
const path = require('path');
const savePath = path.join(__dirname, '../../data');

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async getOne(name): Promise<FileEntity | string> {
    const file = await this.fileRepository.findOne({
      where: { name: name },
    });

    if (!file) return 'dd';

    return await readFile(name);
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
    | ({ path: string; size: number; name: any; mimeType: string } & FileEntity)
    | string
  > {
    const reg = /\/(.*)/;

    const type = '.' + reg.exec(file.mimetype)[1];

    const entry = await this.fileRepository.findOne({
      where: { name: name, size: file.size },
    });

    if (!entry) {
      const newFile = await this.fileRepository.save({
        path: savePath + name + type,
        name: name,
        mimeType: file.mimetype,
        size: file.size,
      });
      await writeFile(name + type, file.buffer);
      return newFile;
    }
    return 'такой файл уже записан';
  }

  async deleteOne(name): Promise<FileEntity | string> {
    const file = await this.fileRepository.findOne({
      where: { name: name },
    });
    const reg = /\/(.*)/;
    const type = '.' + reg.exec(file.mimeType);

    if (!file) return 'такого файла не существует';

    await deleteFile(name + type);
    return 'Successfully deleted ' + name + type;
  }
}
