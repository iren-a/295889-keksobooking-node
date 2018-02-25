const colors = require(`colors`);

const packageInfo = require(`../package.json`);

module.exports = {
  name: `--description`,
  description: `Описание приложения`,
  execute() {
    console.log(colors.gray(packageInfo.description));
    process.exit(0);
  }
};
