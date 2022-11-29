const path = require('path');
const fs = require('fs');
const savePath = path.join(__dirname, '../data/');

export default async (name) => {
  try {
    return fs.readFileSync(savePath + name);
  } catch (err) {
    console.error(err);
  }
};
