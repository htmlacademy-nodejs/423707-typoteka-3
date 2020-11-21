'use strict';

const MESSAGE = `
Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    node ./src/service/service.js <command>
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json
`;

module.exports = {
  name: `--help`,
  run() {
    console.info(MESSAGE);
  }
};
