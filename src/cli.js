const authorCommand = require(`./cli/author`);
const descriptionCommand = require(`./cli/description`);
const helpCommand = require(`./cli/help`);
const versionCommand = require(`./cli/version`);
const generateCommand = require(`./cli/generate`);
const serverCommand = require(`./cli/server`);
const unknownCommandError = require(`./cli/unknown-command-error`);
const defaultRun = require(`./cli/default`);

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
