const authorCommand = require(`./author`);
const descriptionCommand = require(`./description`);
const helpCommand = require(`./help`);
const versionCommand = require(`./version`);

const packageInfo = require(`../package.json`);

const commands = {
  [authorCommand.name]: authorCommand.execute,
  [descriptionCommand.name]: descriptionCommand.execute,
  [helpCommand.name]: helpCommand.execute,
  [versionCommand.name]: versionCommand.execute,
};

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(packageInfo.description);
  process.exit(0);
}

if (!commands[args[0]]) {
  console.error(`Неизвестная команда ${args[0]}.\n` +
    `Чтобы прочитать правила использования приложения, наберите "--help"`);
  process.exit(1);
}

commands[args[0]]();

