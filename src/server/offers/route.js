const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const createStreamFromBuffer = require(`../util/buffer-to-stream`);
const {validateSchema} = require(`../util/validator`);
const keksobookingSchema = require(`./validation`);
const dataRenderer = require(`../util/data-renderer`);
const ValidationError = require(`../error/validation-error`);
const NotFoundError = require(`../error/not-found-error`);
const QueryError = require(`../error/query-error`);
const async = require(`../util/async`);

const offersRouter = new Router();

offersRouter.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

const SKIP_DEFAULT = 0;
const LIMIT_DEFAULT = 20;

const toPage = async (cursor, skip, limit) => {
  return {
    data: await (cursor.skip(skip).limit(limit).toArray()),
    skip,
    limit,
    total: await cursor.count()
  };
};

offersRouter.get(``, async(async (req, res) => {
  let skip = req.query.skip || SKIP_DEFAULT;
  let limit = req.query.limit || LIMIT_DEFAULT;
  skip = +skip;
  limit = +limit;

  if (isNaN(skip) || isNaN(limit)) {
    throw new QueryError();
  }

  res.send(await toPage(await offersRouter.offerStore.getAllOffers(), skip, limit));
}));

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

offersRouter.post(``, upload.fields(fields), async(async (req, res) => {
  const data = req.body;

  let avatar;
  let preview;
  if (req.files) {
    avatar = req.files[`avatar`] ? req.files[`avatar`][0] : null;
    if (avatar) {
      data.avatar = avatar;
    }
    preview = req.files[`preview`] ? req.files[`preview`][0] : null;
    if (preview) {
      data.preview = preview;
    }
  }

  const errors = validateSchema(data, keksobookingSchema);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  if (avatar) {
    const avatarInfo = {
      path: `/api/offers/${data.date}/avatar`,
      mimetype: avatar.mimetype
    };
    await offersRouter.imageStore.save(avatarInfo.path, createStreamFromBuffer(avatar.buffer));
    data.avatar = avatarInfo;
  }

  if (preview) {
    const previewInfo = {
      path: `/api/offers/${data.date}/preview`,
      mimetype: preview.mimetype
    };
    await offersRouter.imageStore.save(previewInfo.path, createStreamFromBuffer(preview.buffer));
    data.preview = previewInfo;
  }

  await offersRouter.offerStore.save(data);
  dataRenderer.renderDataSuccess(req, res, data);
}));

offersRouter.get(`/:date`, async(async (req, res) => {
  const offerDate = req.params.date;

  const found = await offersRouter.offerStore.getOffer(offerDate);
  if (!found) {
    throw new NotFoundError(`Offer with date "${offerDate}" not found`);
  }
  res.send(found);
}));

offersRouter.get(`/:date/avatar`, async(async (req, res) => {
  const offerDate = req.params.date;

  const offer = await offersRouter.offerStore.getOffer(offerDate);

  if (!offer) {
    throw new NotFoundError(`Offer with date "${offerDate}" not found`);
  }

  const avatar = offer.avatar;

  if (!avatar) {
    throw new NotFoundError(`Offer with date "${offerDate}" has no avatar`);
  }

  const {info, stream} = await offersRouter.imageStore.get(avatar.path);

  if (!info) {
    throw new NotFoundError(`File was not found`);
  }

  res.set(`content-type`, avatar.mimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  stream.pipe(res);
}));


offersRouter.use((exception, req, res, next) => {
  dataRenderer.renderException(req, res, exception);
  next();
});


module.exports = (offerStore, imageStore) => {
  offersRouter.offerStore = offerStore;
  offersRouter.imageStore = imageStore;
  return offersRouter;
};

