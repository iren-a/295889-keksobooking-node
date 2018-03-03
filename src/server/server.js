const express = require(`express`);
const offersRouter = require(`./offers/route`);

const HOSTNAME = `127.0.0.1`;
const PORT = 3000;

const app = express();
app.use(express.static(`static`));

app.use(`/api/offers`, offersRouter);

module.exports = {
  run(port = PORT) {
    app.listen(port, HOSTNAME, () => {
      console.log(`Server running at http://${HOSTNAME}:${port}`);
    });
  },
  app
};
