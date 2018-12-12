import { basicFind } from '../db-handlers/basic-query-handler';
import Item from '../db-models/item-model';
import { logger } from '../utils/logger';

export const fetchById = async (obj_id, selectVal, viewer, info) => {
  logger.debug(`in Item fetchById`);
  let record;
  try {
    //model, runParams, queryVal, sortVal, selectVal
    record = await basicFind(
      Item,
      {
        isById: true
      },
      obj_id,
      null,
      selectVal
    );
  } catch (errInternalAlreadyReported) {
    throw new Error(`query failed`);
  }
  return record;
};
