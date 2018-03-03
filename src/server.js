const express = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {generateOffer} = require(`./generator/generate-offer`);

const HOSTNAME = `127.0.0.1`;
const PORT = 3000;

const SKIP_DEFAULT = 0;
const LIMIT_DEFAULT = 20;

const offers = new Array(30).fill(null).map(() =>
  generateOffer()
);

class QueryError extends Error {
  constructor() {
    super();
    this.name = `QueryError`;
    this.message = `Некорректный запрос`;
  }
}

const toPage = (data, skip, limit) => {
  return {
    data: data.slice(skip, skip + limit),
    skip,
    limit,
    total: data.length
  };
};

const app = express();
app.use(express.static(`static`));

app.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

app.get(`/api/offers`, (req, res) => {
  let skip = req.query.skip || SKIP_DEFAULT;
  let limit = req.query.limit || LIMIT_DEFAULT;
  skip = +skip;
  limit = +limit;

  if (isNaN(skip) || isNaN(limit)) {
    throw new QueryError();
  }
  res.send(toPage(offers, skip, limit));
});

app.get(`/api/offers/:date`, (req, res) => {
  const date = +req.params[`date`];
  const offer = offers.find((item) => item.date === date);
  if (!offer) {
    res.status(404).end();
  } else {
    res.send(offer);
  }
});

app.post(`/api/offers`, upload.none(), (req, res) => {
  res.send(req.body);
});

app.use((exception, req, res, next) => {
  let data = exception.message;
  res.status(400).send(data);
  next();
});


module.exports = {
  name: `--server`,
  description: `Запуск сервера`,
  execute(port = PORT) {
    app.listen(port, HOSTNAME, () => {
      console.log(`Server running at http://${HOSTNAME}:${port}`);
    });
  },
  app
};
