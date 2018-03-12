const {MongoClient} = require(`mongodb`);
const logger = require(`../logger`);

const MONGO_URL = `mongodb://localhost:27017`;

const url = process.env.MONGO_URL || MONGO_URL;

module.exports = MongoClient.connect(url)
    .then((client) => client.db(`keksobooking`))
    .catch((err) => {
      logger.error(`Failed to connect to MongoDB`, err);
      process.exit(1);
    });
