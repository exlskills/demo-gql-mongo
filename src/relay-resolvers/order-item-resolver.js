import { logger } from '../utils/logger';
import { connectionFromDataSource } from '../paging-processor/connection-from-datasource';
import { fetchOrderItemList } from '../db-handlers/order/order-item-list-fetch';

export const resolveListOrderItems = async (obj, args, viewer, info) => {
  logger.debug(`in resolveListOrderItems`);
  logger.debug(` args ` + JSON.stringify(args));
  logger.debug(` obj ` + JSON.stringify(obj));

  const businessKey = '_id';
  const fetchParameters = { _id: obj._id };

  const execDetails = {
    queryFunction: fetchOrderItemList,
    businessKey: businessKey,
    fetchParameters: fetchParameters
  };

  return connectionFromDataSource(execDetails, obj, args, viewer, info);
};
