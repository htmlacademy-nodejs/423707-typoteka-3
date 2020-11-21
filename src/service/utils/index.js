'use strict';

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

module.exports.getDate = () => {
  const {getRandomInt} = require(`./`);
  const options = {
    year: `numeric`,
    month: `long`,
    day: `numeric`,
    weekday: `long`,
    timezone: `UTC`,
    hour: `numeric`,
    minute: `numeric`
  };

  const today = Date.now();
  const THREE_MONTHS_IN_MILLISECONDS = 3600000 * 24 * 92; // 7948800000
  const dateLimit = new Date(Date.now() - THREE_MONTHS_IN_MILLISECONDS);

  return new Date(getRandomInt(dateLimit, today)).toLocaleString(`ru`, options);
};
