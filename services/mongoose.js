const mongoose = require('mongoose');
const { green, red } = require('chalk').default;

const logger = require('../config/winston');
const { db } = require('../config');

function connectToDatabase() {
  mongoose.connect(`mongodb://${db.username}:${db.password}@${db.host}/${db.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const { connection } = mongoose;

  connection.on('error', err => {
    logger.error(`${red('Connection to database failed')}`);
    logger.error(`${red(err)}`);
    throw Error(err);
  });

  connection.once('open', () => {
    logger.info(`${green('connection success with the database')}`);
  });
}

module.exports.connectToDatabase = connectToDatabase;
