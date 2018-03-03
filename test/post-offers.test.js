const request = require(`supertest`);
const {app} = require(`../src/server`);

describe(`POST /api/offers`, function () {

  it(`should consume JSON`, () => {
    return request(app).post(`/api/offers`).send({
      author: {avatar: `https://robohash.org/19`},
      offer: {
        title: `Большая уютная квартира`,
        address: `565, 482`,
        price: 656296,
        type: `bungalo`,
        rooms: 5,
        guests: 67,
        checkin: `13:00`,
        checkout: `13:00`,
        features: [`wifi`, `dishwasher`, `parking`],
        description: ``,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]
      },
      location: {x: 565, y: 482},
      date: 1517432400000
    }).expect(200, {
      author: {avatar: `https://robohash.org/19`},
      offer: {
        title: `Большая уютная квартира`,
        address: `565, 482`,
        price: 656296,
        type: `bungalo`,
        rooms: 5,
        guests: 67,
        checkin: `13:00`,
        checkout: `13:00`,
        features: [`wifi`, `dishwasher`, `parking`],
        description: ``,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]
      },
      location: {x: 565, y: 482},
      date: 1517432400000
    });
  });

  it(`should consume form-data`, () => {
    return request(app).post(`/api/offers`).field(`title`, `Большая уютная квартира`).field(`address`, `565, 482`).field(`price`, 656296).field(`type`, `bungalo`).expect(200, {
      title: `Большая уютная квартира`,
      address: `565, 482`,
      price: 656296,
      type: `bungalo`,
    });
  });


});
