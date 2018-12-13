import { logger } from '../utils/logger';
import { connectionFromDataSource } from '../paging-processor/connection-from-datasource';
import { fetchUserList } from '../db-handlers/user/user-list-fetch';
import { fetchByKey } from '../db-handlers/user/user-fetch';

export const resolveListUsers = async (obj, args, viewer, info) => {
  logger.debug(`in resolveListUsers`);
  logger.debug(` args ` + JSON.stringify(args));

  const businessKey = '_id';
  const fetchParameters = {};

  const execDetails = {
    queryFunction: fetchUserList,
    businessKey: businessKey,
    fetchParameters: fetchParameters
  };

  return connectionFromDataSource(execDetails, obj, args, viewer, info);
};

export const resolveGetUser = async (obj, args, viewer, info) => {
  logger.debug(`in resolveGetUser`);
  logger.debug(` args ` + JSON.stringify(args));

  let queryVal;
  try {
    logger.debug(` args.item_query ` + args.item_query);
    queryVal = JSON.parse(args.item_query);
  } catch (err) {
    throw new Error(`Failed converting filter into JSON. Error ` + err);
  }

  const response = await fetchByKey(queryVal, {}, viewer, info);
  logger.debug(`  response: ` + JSON.stringify(response));
  logger.debug(`  response obj keys: ` + Object.keys(response));
  logger.debug(`  response obj keys-to: ` + Object.keys(response.toObject()));
  return response;
};
