const { readdirSync } = require('fs');
const { join, basename } = require('path');

const { User } = require('./user');

readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename(__filename) && file.slice(-3) === '.js')
  .forEach(file => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const model = require(join(__dirname, file));

    module.exports[model.modelName] = model;
  });
