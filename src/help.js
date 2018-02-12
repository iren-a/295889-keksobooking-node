module.exports = {
  name: `--help`,
  description: `Справка`,
  execute() {
    console.log(`Доступные команды:\n` +
      `--help    — печатает этот текст;\n` +
      `--version — печатает версию приложения;\n` +
      `--author — печатает автора приложения;\n` +
      `--description — печатает описание приложения;`);
  }
};
