'use strict';

const fs = require(`fs`);
const {
  getRandomInt,
  shuffle,
  getDate
} = require(`../utils`);

const {DEFAULT_COUNT,
  MAX_PUBLICATION_COUNT,
  SUCCESS_MESSAGE,
  LIMIT_EXCEEDED_MESSAGE,
  FILE_NAME,
  TITLES,
  CATEGORIES,
  SENTENCES} = require(`../constants`);

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

    const countPublication = (value) => {
      return value > MAX_PUBLICATION_COUNT
        ? Number.parseInt(MAX_PUBLICATION_COUNT, 10)
        : Number.parseInt(value, 10) || DEFAULT_COUNT;
    };

    const content = JSON.stringify(generateOffers(countPublication(count)));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(count > MAX_PUBLICATION_COUNT ? LIMIT_EXCEEDED_MESSAGE : SUCCESS_MESSAGE);
    });
  }
};
