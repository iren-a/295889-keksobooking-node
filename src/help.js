require(`colors`);

module.exports = {
  name: `--help`,
  description: `Справка`,
  execute() {
    console.log(`Доступные команды:
${`--help`.gray}  — ${`печатает этот текст;`.green}
${`--version`.gray} — ${`печатает версию приложения;`.green}
${`--author`.gray} — ${`печатает автора приложения;`.green}
${`--description`.gray} — ${`печатает описание приложения;`.green}`);
  }
};
