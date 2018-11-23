import { basicFind } from '../../db-handlers/basic-query-handler';
import User from '../../db-models/user-model';
import { logger } from '../../utils/logger';

export const fetchById = async (obj_id, selectVal, viewer, info) => {
  logger.debug(`in User fetchById`);
  let record;
  try {
    //model, runParams, queryVal, sortVal, selectVal
    record = await basicFind(
      User,
      {
        isById: true
      },
      obj_id,
      null,
      selectVal
    );
  } catch (errInternalAlreadyReported) {
    return null;
  }
  return record;
};

export const fetchByKey = async (queryVal, selectVal, viewer, info) => {
  logger.debug(`in User fetchByKey`);
  let record;
  try {
    //model, runParams, queryVal, sortVal, selectVal
    record = await basicFind(
      User,
      {
        isOne: true
      },
      queryVal,
      null,
      selectVal
    );
  } catch (errInternalAlreadyReported) {
    return null;
  }
  return record;
};
