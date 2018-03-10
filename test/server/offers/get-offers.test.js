const request = require(`supertest`);
const assert = require(`assert`);
const mockOffersRouter = require(`./mock-offers-router`);
const app = require(`express`)();

app.use(`/api/offers`, mockOffersRouter);

describe(`GET /api/offers`, function () {

  it(`respond to request without query`, () => {
    return request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const offers = response.body;
          assert.equal(offers.data.length, 20);
          assert.equal(Object.keys(offers.data[0]).length, 4);
        });
  });

  it(`respond to request with correct query`, () => {
    return request(app)
        .get(`/api/offers?skip=5&limit=3`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const offers = response.body;
          assert.equal(offers.data.length, 3);
        });
  });

  it(`by incorrect query should respond with 400`, () => {
    return request(app)
        .get(`/api/offers?skip=incorrect&limit=incorrect`)
        .set(`Accept`, `text/html`)
        .expect(400)
        .expect(`Content-Type`, /html/);
  });

  it(`find offer by date`, () => {
    return request(app)
        .get(`/api/offers/${encodeURIComponent(+new Date(2018, 1))}`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const offer = response.body;
          assert.equal(offer.date, +new Date(2018, 1));
        });
  });

  it(`unknown address should respond with 404`, () => {
    return request(app)
        .get(`/api/unknown`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Content-Type`, /html/);
  });


});
