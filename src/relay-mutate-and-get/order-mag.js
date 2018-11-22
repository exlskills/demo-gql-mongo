import * as OrderCud from '../db-handlers/order/order-cud';
import { logger } from '../utils/logger';
import { toGlobalId } from 'graphql-relay';

export const createOrder = async (orderObj, viewer, info) => {
  logger.debug(`in order-mag createOrder`);
  logger.debug(`  orderObj ` + JSON.stringify(orderObj));
  try {
    const order_id_db = await OrderCud.createOrder(orderObj);
    const order_id = toGlobalId('UserOrder', order_id_db);
    return { order_id: order_id, completionObj: { code: '0', msg: '' } };
  } catch (error) {
    return { completionObj: { code: '1', msg: error.message } };
  }
};
