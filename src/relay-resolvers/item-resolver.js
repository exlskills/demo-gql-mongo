import { logger } from '../utils/logger';
import { fetchById } from '../db-handlers/item-fetch';
import { fromGlobalId } from 'graphql-relay';

export const resolveGetItem = async (obj, args, viewer, info) => {
  logger.debug(`in resolveItem`);
  logger.debug(` args ` + JSON.stringify(args));

  logger.debug(` info.fieldNodes ` + JSON.stringify(info.fieldNodes));
  if (
    info.fieldNodes &&
    info.fieldNodes.length > 0 &&
    info.fieldNodes[0].selectionSet
  ) {
    for (let fld of info.fieldNodes[0].selectionSet.selections) {
      logger.debug(` field ` + JSON.stringify(fld));
    }
  }

  let itemId;
  if (obj && obj.item_id) {
    itemId = obj.item_id;
  } else {
    itemId = fromGlobalId(args.item_id).id;
  }

  let result = await fetchById(itemId);
  logger.debug(` result ` + JSON.stringify(result));
  return result;
};
