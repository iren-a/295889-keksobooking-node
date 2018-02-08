const command = process.argv[2];

switch (command) {
  case `--version`:
    console.log(`v0.0.1`);
    break;

  case `--help`:
    console.log(`Доступные команды:\n` +
      `--help    — печатает этот текст;\n` +
      `--version — печатает версию приложения;`);

    break;

  case undefined:
    console.log(`Привет!\n` +
      `Эта программа будет запускать сервер «Кексобукинг».\n` +
      `Автор: Кекс.`);
    break;

  default:
    console.error(`Неизвестная команда ${command}.\n` +
      `Чтобы прочитать правила использования приложения, наберите "--help"`);
    process.exitCode = 1;
    break;
}
