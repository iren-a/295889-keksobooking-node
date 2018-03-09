const express = require(`express`);
const offerStore = require(`./offers/store`);
const imageStore = require(`./images/store`);
const offersRouter = require(`./offers/route`)(offerStore, imageStore);
const logger = require(`../logger`);

const HOSTNAME = process.env.SERVER_HOST || `localhost`;
const PORT = parseInt(process.env.SERVER_PORT, 10) || 3000;

const app = express();
app.use(express.static(`static`));

app.use(`/api/offers`, offersRouter);

module.exports = {
  run(port = PORT) {
    app.listen(port, HOSTNAME, () => {
      logger.info(`Server running at http://${HOSTNAME}:${port}`);
    });
  },
  app
};
