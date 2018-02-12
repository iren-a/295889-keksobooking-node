const packageInfo = require(`../package.json`);

module.exports = {
  name: `--version`,
  description: `Версия приложения`,
  execute() {
    console.log(`v${packageInfo.version}`);
  }
};
