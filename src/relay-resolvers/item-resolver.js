import { logger } from '../utils/logger';
import { fetchById } from '../db-handlers/item-fetch';
import { fromGlobalId } from 'graphql-relay';

export const resolveItem = async (obj, args, viewer, info) => {
  logger.debug(`in resolveItem`);
  logger.debug(` args ` + JSON.stringify(args));

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
