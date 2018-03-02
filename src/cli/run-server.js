const {run: runServer} = require(`../server/server`);

module.exports = {
  name: `--server`,
  description: `Запуск сервера`,
  execute(port) {
    runServer(port);
  }
};
