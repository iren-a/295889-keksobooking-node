const colors = require(`colors`);

module.exports = {
  name: `--help`,
  description: `Справка`,
  execute() {
    console.log(`Доступные команды:
${colors.gray(`--help`)}  — ${colors.green(`печатает этот текст;`)}
${colors.gray(`--version`)} — ${colors.green(`печатает версию приложения;`)}
${colors.gray(`--author`)} — ${colors.green(`печатает автора приложения;`)}
${colors.gray(`--description`)} — ${colors.green(`печатает описание приложения;`)}
${colors.gray(`--generate`)} — ${colors.green(`генерирует данные;`)}
${colors.gray(`--server`)} — ${colors.green(`запускает сервер;`)}`);
    process.exit(0);
  }
};
