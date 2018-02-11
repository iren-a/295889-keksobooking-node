require(`colors`);

const packageInfo = require(`../package.json`);

const version = packageInfo.version.split(`.`);

module.exports = {
  name: `--version`,
  description: `Версия приложения`,
  execute() {
    console.log(`v${version[0].red}.${version[1].green}.${version[2].blue}`);
  }
};
