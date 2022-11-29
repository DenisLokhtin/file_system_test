const path = require('path');
const fs = require('fs');
const savePath = path.join(__dirname, '../data/');

export default async (name, data) => {
  try {
    await fs.mkdirSync(savePath, { recursive: true }, function (err) {
      if (err) return err;
    });
    await fs.writeFileSync(savePath + name, data);
  } catch (err) {
    console.error(err);
  }
};
