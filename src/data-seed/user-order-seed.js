// npx babel-node src/data-seed/user-order-seed.js

import mongoose from 'mongoose';
import * as fs from 'fs-extra';
import path from 'path';
import * as yaml from 'js-yaml';
import config from '../config';
import UserOrder from '../db-models/user-order-model';
import { logger } from '../utils/logger';

async function loadData() {
  try {
    logger.debug(`path __dirname ` + __dirname);
    const fileToRead = path.join(__dirname, './sample-data/user-order.yaml');
    const fileContents = await fs.readFile(fileToRead);
    const parsed = yaml.safeLoad(fileContents);
    logger.info(`parsed ` + JSON.stringify(parsed));

    for (let userOrder of parsed) {
      logger.debug(`user_order ` + JSON.stringify(userOrder));
      try {
        await UserOrder.create(userOrder);
      } catch (err) {
        logger.error(`Failed with error ` + err);
      }
    }
    logger.info('Ok ');
  } catch (err) {
    logger.error('Fatal error ' + err);
  }
}

startRun();

async function startRun() {
  try {
    // logger.info('Connecting to URI ' + config.mongo.uri);
    logger.info('Connecting to DB ' + config.mongo.db);
    mongoose.set('useCreateIndex', true);
    await mongoose.connect(
      config.mongo.uri + '/' + config.mongo.db,
      {
        useNewUrlParser: true
      }
    );

    if (config.db_debug_log) {
      mongoose.set('debug', true);
    }

    logger.info('Mongoose connected ok ');
    logger.debug(
      'Mongo DB ' +
        UserOrder.db.host +
        ':' +
        UserOrder.db.port +
        '/' +
        UserOrder.db.name
    );

    try {
      const res = await loadData();
      logger.info('done');
    } catch (err) {
      // Must be reported in loadData
    }

    closeConnection();
  } catch (err) {
    logger.error('Process error: ', err);
    process.exit(1);
  }
}

const closeConnection = () => {
  mongoose.connection.close(() => {
    logger.info('Done, mongoose connection disconnected.');
  });
};
