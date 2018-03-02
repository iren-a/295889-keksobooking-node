const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {generateOffer} = require(`../../generator/generate-offer`);
const {validateSchema} = require(`../util/validator`);
const keksobookingSchema = require(`./validation`);

const offersRouter = new Router();

offersRouter.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

const offers = new Array(30).fill(null).map(() =>
  generateOffer()
);

const SKIP_DEFAULT = 0;
const LIMIT_DEFAULT = 20;

const toPage = (data, skip, limit) => {
  return {
    data: data.slice(skip, skip + limit),
    skip,
    limit,
    total: data.length
  };
};


class QueryError extends Error {
  constructor() {
    super();
    this.name = `QueryError`;
    this.message = `Некорректный запрос`;
  }
}

class ValidationError extends Error {
  constructor(errors) {
    super();
    this.name = `ValidationError`;
    this.message = `Некорректные данные`;
    this.errors = errors;
  }
}


offersRouter.get(``, (req, res) => {
  let skip = req.query.skip || SKIP_DEFAULT;
  let limit = req.query.limit || LIMIT_DEFAULT;
  skip = +skip;
  limit = +limit;

  if (isNaN(skip) || isNaN(limit)) {
    throw new QueryError();
  }
  res.send(toPage(offers, skip, limit));
});

offersRouter.get(`/:date`, (req, res) => {
  const date = +req.params[`date`];
  const offer = offers.find((item) => item.date === date);
  if (!offer) {
    res.status(404).end();
  } else {
    res.send(offer);
  }
});


const fields = [
  {
    name: `avatar`,
    maxCount: 1
  },
  {
    name: `preview`,
    maxCount: 1
  }
];

offersRouter.post(``, upload.fields(fields), (req, res) => {
  const data = req.body;
  const errors = validateSchema(data, keksobookingSchema);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  res.send(data);
});

offersRouter.use((exception, req, res, next) => {
  const data = (exception instanceof ValidationError) ? exception.errors : exception.message;
  res.status(400).send(data);
  next();
});


module.exports = offersRouter;
