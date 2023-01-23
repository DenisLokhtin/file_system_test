import * as fs from 'fs';
import * as path from 'path';
const savePath = path.join(__dirname, '../data/');

export default async (name) => {
  try {
    return fs.unlinkSync(savePath + name);
  } catch (err) {
    console.error(err);
  }
};
