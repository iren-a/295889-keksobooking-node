const request = require(`supertest`);
const mockOffersRouter = require(`./mock-offers-router`);
const app = require(`express`)();

app.use(`/api/offers`, mockOffersRouter);

describe(`POST /api/offers`, function () {

  it(`should consume JSON`, () => {
    return request(app).post(`/api/offers`).send({
      title: `Большая уютная квартира недорого`,
      address: `565, 482`,
      price: 500,
      type: `bungalo`,
      rooms: 5,
      guests: 67,
      checkin: `13:00`,
      checkout: `13:00`,
      features: [`wifi`, `dishwasher`, `parking`],
      description: ``
    }).expect(200, {
      title: `Большая уютная квартира недорого`,
      address: `565, 482`,
      price: 500,
      type: `bungalo`,
      rooms: 5,
      guests: 67,
      checkin: `13:00`,
      checkout: `13:00`,
      features: [`wifi`, `dishwasher`, `parking`],
      description: ``
    });
  });

  it(`should consume form-data`, () => {
    return request(app).post(`/api/offers`)
        .field(`title`, `Большая уютная квартира недорого`)
        .field(`address`, `565, 482`)
        .field(`price`, 500)
        .field(`type`, `bungalo`)
        .field(`rooms`, 5)
        .field(`guests`, 67)
        .field(`checkin`, `13:00`)
        .field(`checkout`, `13:00`)
        .field(`features`, [`wifi`, `dishwasher`, `parking`])
        .field(`description`, ``)
        .expect(200, {
          title: `Большая уютная квартира недорого`,
          address: `565, 482`,
          price: 500,
          type: `bungalo`,
          rooms: 5,
          guests: 67,
          checkin: `13:00`,
          checkout: `13:00`,
          features: [`wifi`, `dishwasher`, `parking`],
          description: ``
        });
  });

  it(`should respond with 400 by incorrect form-data`, () => {
    return request(app).post(`/api/offers`)
        .field(`title`, `Б`)
        .field(`address`, `565, 482`)
        .field(`price`, 500)
        .field(`type`, `bungalo`)
        .field(`rooms`, 5)
        .field(`guests`, 67)
        .field(`checkin`, `13:00`)
        .field(`checkout`, `13:00`)
        .field(`features`, [`wifi`, `dishwasher`, `parking`])
        .field(`description`, ``)
        .expect(400, [{
          fieldName: `title`,
          fieldValue: `Б`,
          errorMessage: `should be in range 30..140`
        }]);
  });

  it(`should respond with 400 by incorrect form-data`, () => {
    return request(app).post(`/api/offers`)
        .field(`title`, `Большая уютная квартира недорого`)
        .field(`address`, `565, 482`)
        .field(`price`, 500)
        .field(`type`, `bungalo`)
        .field(`rooms`, 5)
        .field(`guests`, 67)
        .field(`checkin`, `13:00`)
        .field(`checkout`, `13:00`)
        .field(`features`, [`wifi`, `dishwasher`, `parking`, `wifi`])
        .field(`description`, ``)
        .expect(400, [{
          fieldName: `features`,
          fieldValue: [`wifi`, `dishwasher`, `parking`, `wifi`],
          errorMessage: `should be unique`
        }]);
  });

  it(`should respond with 400 by incorrect form-data`, () => {
    return request(app).post(`/api/offers`)
        .field(`title`, `Большая уютная квартира недорого`)
        .field(`address`, `565, 482`)
        .field(`price`, 500)
        .field(`type`, `bungalo`)
        .field(`rooms`, 5)
        .field(`guests`, 67)
        .field(`checkin`, `13:00`)
        .field(`checkout`, `13:00`)
        .field(`features`, [`wifi`, `dishwasher`, `parking`, `wwwww`])
        .field(`description`, ``)
        .expect(400, [{
          fieldName: `features`,
          fieldValue: [`wifi`, `dishwasher`, `parking`, `wwwww`],
          errorMessage: `should be any of [wifi,dishwasher,parking,washer,elevator,conditioner]`
        }]);
  });

  it(`should respond with 400 by incorrect form-data`, () => {
    return request(app).post(`/api/offers`)
        .field(`title`, `Большая уютная квартира недорого`)
        .field(`address`, `565, 482`)
        .field(`price`, 500)
        .field(`type`, `bungalo`)
        .field(`rooms`, 5)
        .field(`guests`, 67)
        .field(`checkin`, `0000`)
        .field(`checkout`, `13:00`)
        .field(`features`, [`wifi`, `dishwasher`, `parking`])
        .field(`description`, ``)
        .expect(400, [{
          fieldName: `checkin`,
          fieldValue: `0000`,
          errorMessage: `should be a time in format HH:mm`
        }]);
  });

});
