const colors = require(`colors`);
const util = require(`util`);
const readline = require(`readline`);
const fs = require(`fs`);
const descriptionCommand = require(`./description`);
const generateCommand = require(`./generate`);

const access = util.promisify(fs.access);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (arg) => {
  return new Promise((resolve) => {
    rl.question(arg, resolve);
  });
};

class CanceledGeneration extends Error {
  constructor() {
    super();
    this.name = `CanceledGeneration`;
    this.message = `Генерация отменена`;
    this.stack = (new Error()).stack;
  }
}

module.exports = {
  name: `default`,
  description: `Поведение для запуска без параметров`,
  execute() {
    let countOfElements;
    let filePath;

    descriptionCommand.execute();

    question(colors.cyan(`Запустить генерацию данных? y/n: `))
        .then((answer) => {
          if (answer.trim() !== `y`) {
            throw new CanceledGeneration();
          }
          return question(colors.cyan(`Сколько элементов сгенерировать? Введите число: `));
        })
        .then((answer) => {
          countOfElements = +answer;
          if (!(countOfElements > 0)) {
            throw new Error(`Указано неверное число`);
          }
          return question(colors.cyan(`Укажите путь до файла: `));
        })
        .then((answer) => {
          filePath = answer.trim();
          if (!filePath) {
            throw new Error(`Путь не указан`);
          }
          return access(filePath, fs.constants.F_OK);
        })
        .then(() => {
          return question(colors.cyan(`Файл уже существует. Перезаписать? y/n: `))
              .then((answer) => {
                if (answer.trim() !== `y`) {
                  throw new CanceledGeneration();
                }
              });
        },
        (err) => {
          if (err.code !== `ENOENT`) {
            throw err;
          }
        })
        .then(() => {
          return generateCommand.execute(filePath, countOfElements);
        })
        .then(() => {
          console.log(colors.green(`Данные сгенерированы`));
          process.exit(0);
        })
        .catch((err) => {
          if (err instanceof CanceledGeneration) {
            console.log(colors.yellow(err.message));
            process.exit(0);
          } else {
            console.error(colors.red(err));
            process.exit(1);
          }
        });

  }
};
