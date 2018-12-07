import { fromGlobalId } from 'graphql-relay';
import { fetchById } from '../db-handlers/user/user-fetch';
import { logger } from '../utils/logger';
import { connectionFromDataSource } from '../paging-processor/connection-from-datasource';
import { fetchUserOrderList } from '../db-handlers/user/user-order-list-fetch';

export const resolveListUserOrders = async (obj, args, viewer, info) => {
  logger.debug(`in resolveListUserOrders`);
  logger.debug(` obj ` + JSON.stringify(obj));
  logger.debug(` args ` + JSON.stringify(args));
  logger.debug(` viewer ` + JSON.stringify(viewer));
  logger.debug(` info ` + JSON.stringify(info));

  const user_id_db = fromGlobalId(args.user_id).id;
  const user_rec = await fetchById(user_id_db, { _id: 1 });
  if (!user_rec || !user_rec._id) {
    return Promise.reject('User not found');
  }

  const businessKey = '_id';
  const fetchParameters = { user_id: user_id_db };

  const execDetails = {
    queryFunction: fetchUserOrderList,
    businessKey: businessKey,
    fetchParameters: fetchParameters
  };

  return connectionFromDataSource(execDetails, obj, args, viewer, info);
};
