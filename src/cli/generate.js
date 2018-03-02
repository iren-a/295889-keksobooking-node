const {generateOffer} = require(`../generator/generate-offer`);
const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

module.exports = {
  name: `--generate`,
  description: `Генерация данных`,
  execute(filePath = `${process.cwd()}/offers-data.json`, countOfElements = 1) {
    const data = new Array(countOfElements).fill(null).map(() =>
      generateOffer()
    );
    return writeFile(filePath, JSON.stringify(data), fileWriteOptions);
  }
};
