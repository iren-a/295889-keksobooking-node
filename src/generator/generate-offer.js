const data = require(`./data`);

const getRandomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const LOCATION_X = getRandomInteger(300, 900);
const LOCATION_Y = getRandomInteger(150, 500);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const location = {
  x: LOCATION_X,
  y: LOCATION_Y
};

const generateOffer = () => {
  const shuffledPhotos = [...data.PHOTOS];
  shuffleArray(shuffledPhotos);

  return {
    author: {
      avatar: `${data.ADDRESS}/${getRandomInteger(1, 100)}`
    },
    offer: {
      title: data.TITLES[getRandomInteger(0, data.TITLES.length - 1)],
      address: `${location.x}, ${location.y}`,
      price: getRandomInteger(data.PRICE.MIN, data.PRICE.MAX),
      type: data.TYPES[getRandomInteger(0, data.TYPES.length - 1)],
      rooms: getRandomInteger(data.ROOMS.MIN, data.ROOMS.MAX),
      guests: getRandomInteger(1, 100),
      checkin: data.CHECKIN_TIMES[getRandomInteger(0, data.CHECKIN_TIMES.length - 1)],
      checkout: data.CHECKOUT_TIMES[getRandomInteger(0, data.CHECKOUT_TIMES.length - 1)],
      features: data.FEATURES.slice(0, getRandomInteger(1, data.FEATURES.length)),
      description: ``,
      photos: shuffledPhotos
    },
    location: {
      x: location.x,
      y: location.y
    },
    date: +new Date(2018, 1)
  };
};

module.exports = {
  generateOffer
};
