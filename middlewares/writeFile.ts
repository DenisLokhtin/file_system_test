import * as fs from 'fs';
import * as path from 'path';
const savePath = path.join(__dirname, '../data/');

export default async (name, data) => {
  try {
    fs.mkdirSync(savePath, { recursive: true });
    const writer = fs.createWriteStream(savePath + name);
    writer.write(data);
  } catch (err) {
    console.error(err);
  }
};
