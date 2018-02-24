const assert = require(`assert`);
const {generateEntity} = require(`../src/generator/generate-entity`);
const data = require(`../src/generator/data`);

const entity = generateEntity();


describe(`Checking function generateEntity`, () => {
  describe(`types checking`, () => {
    it(`function return object`, () => {
      assert.equal(typeof entity, `object`);
    });
    it(`author is object`, () => {
      assert.equal(typeof entity.author, `object`);
    });
    it(`offer is object`, () => {
      assert.equal(typeof entity.offer, `object`);
    });
    it(`location is object`, () => {
      assert.equal(typeof entity.location, `object`);
    });
  });
  describe(`author checking`, () => {
    it(`avatar is correct`, () => {
      assert(entity.author.avatar.match(/^https:\/\/robohash.org\//));
    });
  });
  describe(`offer checking`, () => {
    it(`title is correct`, () => {
      assert.notEqual(data.TITLES.indexOf(entity.offer.title), -1);
    });
    it(`address is correct`, () => {
      assert(entity.offer.address.match(/^\d+, \d+$/));
    });
    it(`price is correct`, () => {
      assert(entity.offer.price >= data.PRICE.MIN && entity.offer.price <= data.PRICE.MAX);
    });
    it(`type is correct`, () => {
      assert.notEqual(data.TYPES.indexOf(entity.offer.type), -1);
    });
    it(`rooms is correct`, () => {
      assert(entity.offer.rooms >= data.ROOMS.MIN && entity.offer.rooms <= data.ROOMS.MAX);
    });
    it(`guests is correct`, () => {
      assert.equal(typeof entity.offer.guests, `number`);
    });
    it(`checkin is correct`, () => {
      assert.notEqual(data.CHECKIN_TIMES.indexOf(entity.offer.checkin), -1);
    });
    it(`checkout is correct`, () => {
      assert.notEqual(data.CHECKOUT_TIMES.indexOf(entity.offer.checkout), -1);
    });
    it(`features is correct`, () => {
      assert(Array.isArray(entity.offer.features));
    });
    it(`description is correct`, () => {
      assert.equal(entity.offer.description, ``);
    });
    it(`photos is correct`, () => {
      assert(Array.isArray(entity.offer.photos));
    });
  });
  describe(`location checking`, () => {
    it(`x is correct`, () => {
      assert.equal(typeof entity.location.x, `number`);
    });
    it(`y is correct`, () => {
      assert.equal(typeof entity.location.y, `number`);
    });
  });
});
