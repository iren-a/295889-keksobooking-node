const colors = require(`colors`);
const descriptionCommand = require(`./description`);
const generateCommand = require(`./generate`);
const {questionPromise} = require(`./question-promise`);

module.exports = {
  name: `default`,
  description: `Поведение для запуска без парметров`,
  execute() {
    descriptionCommand.execute();

    questionPromise(`Запустить генерацию данных? y/n: `).then((answer) => {
      answer = answer.trim();
      if (answer === `y`) {
        return generateCommand.execute();
      } else {
        console.log(colors.red(`Генерация отменена`));
        process.exit(0);
      }
    }).catch((err) => {
      console.error(colors.red(err));
      process.exit(1);
    });

  }
};
