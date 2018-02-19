const {generateEntity} = require(`./generator/generate-entity`);
const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
const data = generateEntity();

module.exports = {
  name: `--generate`,
  description: `Генерация данных`,
  execute(filePath = `${process.cwd()}/offers-data.json`) {
    return writeFile(filePath, JSON.stringify(data), fileWriteOptions);
  }
};
