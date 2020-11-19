'use strict';
const fs = require(`fs`);
const {
  getRandomInt,
  shuffle,
} = require(`../utils`);

const {DEFAULT_COUNT, FILE_NAME, TITLES, CATEGORIES, SENTENCES} = require('../constants');

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: '',
    announce: shuffle(SENTENCES).slice(1, 5).join(` `),
    fullText: shuffle(SENTENCES).slice(1, 5).join(` `),
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]]
  }))
);


module.exports = {
  name: `--generate`,
  run() {
    const [count] = args;
    const countPublication = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countPublication));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });
  }
}
