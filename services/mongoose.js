const mongoose = require('mongoose');
const { green, red } = require('chalk').default;

const logger = require('../config/winston');
const { db } = require('../config');
const { Permission } = require('../models');
const { permissions } = require('../seeders/permissions');
const DbContext = require('../services/db_context');

const Permissions = new DbContext(Permission);

function isPermissionIncluded(permissionsArray, item) {
  return permissionsArray.find(i => i.name === item.name) !== undefined;
}

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

  connection.once('open', async () => {
    logger.info(`${green('connection success with the database')}`);

    let dbPermissions = await Permissions.all();

    if (dbPermissions === undefined || dbPermissions == null || dbPermissions.length <= 0) {
      dbPermissions = await Permission.create(permissions);
    }

    const permissionsNotInDatabase = permissions.filter(p => !isPermissionIncluded(dbPermissions, p));

    if (permissionsNotInDatabase.length > 0) {
      await Permission.create(permissionsNotInDatabase);
    }
  });
}

module.exports.connectToDatabase = connectToDatabase;
