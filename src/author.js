const colors = require(`colors`);

const packageInfo = require(`../package.json`);

module.exports = {
  name: `--author`,
  description: `Автор приложения`,
  execute() {
    console.log(colors.gray(packageInfo.author));
  }
};
