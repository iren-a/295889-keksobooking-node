const packageInfo = require(`../package.json`);

module.exports = {
  name: `--author`,
  description: `Автор приложения`,
  execute() {
    console.log(packageInfo.author);
  }
};
