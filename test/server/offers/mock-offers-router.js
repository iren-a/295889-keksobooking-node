const createOffersRouter = require(`../../../src/server/offers/route`);
const {generateOffer} = require(`../../../src/generator/generate-offer`);

const offers = new Array(30).fill(null).map(() =>
  generateOffer()
);

class Cursor {
  constructor(data) {
    this.data = data;
  }

  skip(count) {
    return new Cursor(this.data.slice(count));
  }

  limit(count) {
    return new Cursor(this.data.slice(0, count));
  }

  async count() {
    return this.data.length;
  }

  async toArray() {
    return this.data;
  }
}

class MockOfferStore {
  constructor() {
  }

  async getOffer(date) {
    return offers.find((it) => it.date === +date);
  }

  async getAllOffers() {
    return new Cursor(offers);
  }

  async save() {
  }

}

class MockImageStore {

  async getBucket() {
  }

  async get() {
  }

  async save() {
  }

}

module.exports = createOffersRouter(new MockOfferStore(), new MockImageStore());
