const colors = require(`colors`);

module.exports = {
  name: `unknown-command-error`,
  description: `Неизвестная команда`,
  execute(cmd) {
    console.error(`${colors.red(`Неизвестная команда`)} ${cmd}.
Чтобы прочитать правила использования приложения, наберите "--help"`);
    process.exit(1);
  }
};
