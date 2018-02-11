require(`colors`);

const packageInfo = require(`../package.json`);

module.exports = {
  name: `--description`,
  description: `Описание приложения`,
  execute() {
    console.log(packageInfo.description.gray);
  }
};
