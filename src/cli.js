const authorCommand = require(`./author`);
const descriptionCommand = require(`./description`);
const helpCommand = require(`./help`);
const versionCommand = require(`./version`);
const generateCommand = require(`./generate`);
const serverCommand = require(`./server`);
const unknownCommandError = require(`./unknown-command-error`);
const defaultRun = require(`./default`);

let arg = process.argv[2] ? process.argv[2] : null;

const commands = new Map([
  [authorCommand.name, authorCommand.execute],
  [descriptionCommand.name, descriptionCommand.execute],
  [helpCommand.name, helpCommand.execute],
  [versionCommand.name, versionCommand.execute],
  [generateCommand.name, generateCommand.execute],
  [serverCommand.name, serverCommand.execute],
  [null, defaultRun.execute]
]);

if (commands.has(arg)) {
  commands.get(arg)(process.argv[3]);
} else {
  unknownCommandError.execute(arg);
}
