'use strict';
const fs = require(`fs`);
const {
  getRandomInt,
  shuffle,
  getDate
} = require(`../utils`);

const {DEFAULT_COUNT, MAX_PUBLICATION_COUNT, FILE_NAME, TITLES, CATEGORIES, SENTENCES} = require('../constants');

// const getDate = () => {
//   const options = {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     weekday: 'long',
//     timezone: 'UTC',
//     hour: 'numeric',
//     minute: 'numeric'
//   };
//
//   const today = Date.now();
//   const THREE_MONTHS_IN_MILLISECONDS = 3600000 * 24 * 92; // 7948800000
//   const dateLimit = new Date(Date.now() - THREE_MONTHS_IN_MILLISECONDS);
//
//   return new Date(getRandomInt(dateLimit, today)).toLocaleString("ru", options);
// };

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: getDate(),
    announce: shuffle(SENTENCES).slice(1, 5).join(` `),
    fullText: shuffle(SENTENCES).slice(1, getRandomInt(6, 20)).join(` `),
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]]
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;

    const countPublication = (count) => {
      return count > MAX_PUBLICATION_COUNT
        ? Number.parseInt(MAX_PUBLICATION_COUNT, 10)
        : Number.parseInt(count, 10) || DEFAULT_COUNT;
    };

    const SUCCESS_MESSAGE = `Успешно! Файл создан.`;
    const LIMIT_EXCEEDED = `Не больше 1000 публикаций`;

    const content = JSON.stringify(generateOffers(countPublication(count)));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(count > MAX_PUBLICATION_COUNT ? LIMIT_EXCEEDED : SUCCESS_MESSAGE );
    });
  }
}
