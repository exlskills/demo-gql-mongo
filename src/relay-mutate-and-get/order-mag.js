import { toGlobalId } from 'graphql-relay';
import * as OrderCud from '../db-handlers/order/order-cud';
import { logger } from '../utils/logger';

export const createOrder = async (orderObj, viewer, info) => {
  logger.debug(`in order-mag createOrder`);
  logger.debug(`  orderObj ` + JSON.stringify(orderObj));

  for (let item of orderObj.order_items) {
    if (item.item_details) {
      let itemDetailsObj;
      try {
        itemDetailsObj = JSON.parse(item.item_details);
      } catch (err) {
        return {
          completionObj: {
            code: '1',
            msg_id: 'DO01',
            msg:
              'Item details parse failed for item ' +
              item.item_id +
              ': ' +
              err.message,
            processed: 0,
            modified: 0
          }
        };
      }
      item.item_details = itemDetailsObj;
    }
  }
  try {
    const order_id_db = await OrderCud.createOrder(orderObj);
    const order_id = toGlobalId('UserOrder', order_id_db);
    return {
      order_id: order_id,
      completionObj: {
        code: '0',
        msg_id: '002',
        msg: 'Order created',
        processed: 1,
        modified: 0
      }
    };
  } catch (error) {
    return {
      completionObj: {
        code: '1',
        msg_id: 'EO01',
        msg: error.message,
        processed: 0,
        modified: 0
      }
    };
  }
};
