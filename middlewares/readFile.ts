import * as fs from 'fs';
import { StreamableFile } from '@nestjs/common';

export default async (name, res, file) => {
  try {
    const fileName = 'dist/data/' + name;
    res.contentType(file.mimeType);
    res.attachment(name);
    const readStream = fs.createReadStream(fileName);
    return new StreamableFile(readStream);
  } catch (err) {
    console.error(err);
  }
};
