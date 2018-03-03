const assert = require(`assert`);
const {generateOffer} = require(`../src/generator/generate-offer`);
const data = require(`../src/generator/data`);

const offer = generateOffer();


describe(`Checking function generateEntity`, () => {
  describe(`types checking`, () => {
    it(`function return object`, () => {
      assert.equal(typeof offer, `object`);
    });
    it(`author is object`, () => {
      assert.equal(typeof offer.author, `object`);
    });
    it(`offer is object`, () => {
      assert.equal(typeof offer.offer, `object`);
    });
    it(`location is object`, () => {
      assert.equal(typeof offer.location, `object`);
    });
  });
  describe(`author checking`, () => {
    it(`avatar is correct`, () => {
      assert(offer.author.avatar.match(/^https:\/\/robohash.org\//));
    });
  });
  describe(`offer checking`, () => {
    it(`title is correct`, () => {
      assert.notEqual(data.TITLES.indexOf(offer.offer.title), -1);
    });
    it(`address is correct`, () => {
      assert(offer.offer.address.match(/^\d+, \d+$/));
    });
    it(`price is correct`, () => {
      assert(offer.offer.price >= data.PRICE.MIN && offer.offer.price <= data.PRICE.MAX);
    });
    it(`type is correct`, () => {
      assert.notEqual(data.TYPES.indexOf(offer.offer.type), -1);
    });
    it(`rooms is correct`, () => {
      assert(offer.offer.rooms >= data.ROOMS.MIN && offer.offer.rooms <= data.ROOMS.MAX);
    });
    it(`guests is correct`, () => {
      assert.equal(typeof offer.offer.guests, `number`);
    });
    it(`checkin is correct`, () => {
      assert.notEqual(data.CHECKIN_TIMES.indexOf(offer.offer.checkin), -1);
    });
    it(`checkout is correct`, () => {
      assert.notEqual(data.CHECKOUT_TIMES.indexOf(offer.offer.checkout), -1);
    });
    it(`features is correct`, () => {
      assert(Array.isArray(offer.offer.features));
    });
    it(`description is correct`, () => {
      assert.equal(offer.offer.description, ``);
    });
    it(`photos is correct`, () => {
      assert(Array.isArray(offer.offer.photos));
    });
  });
  describe(`location checking`, () => {
    it(`x is correct`, () => {
      assert.equal(typeof offer.location.x, `number`);
    });
    it(`y is correct`, () => {
      assert.equal(typeof offer.location.y, `number`);
    });
  });
});
