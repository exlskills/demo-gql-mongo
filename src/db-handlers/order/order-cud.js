import UserOrder from '../../db-models/user-order-model';
import { id_gen } from '../../utils/url-id-generator';
import { logger } from '../../utils/logger';

export const createOrder = async order_data => {
  logger.debug(`in createOrder`);
  let order_id = id_gen();

  // Uncomment to test ID regeneration functionality
  // order_id = '1UtNnZBYUHDx';

  while (true) {
    const orderObject = { _id: order_id, ...order_data };
    logger.debug(JSON.stringify(orderObject));

    try {
      await UserOrder.create(orderObject);
    } catch (err) {
      if (
        err.message.indexOf(order_id) !== -1 &&
        err.message.indexOf('duplicate key error') !== -1
      ) {
        logger.debug(err.message);
        order_id = id_gen();
        continue;
      } else {
        logger.error('While Creating Order ' + err);
        return Promise.reject('Error creating Order', err);
      }
    }
    logger.debug('Order created with id ' + order_id);
    return order_id;
  }
};
