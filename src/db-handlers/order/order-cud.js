import UserOrder from '../../db-models/user-order-model';
import { id_gen } from '../../utils/url-id-generator';
import { logger } from '../../utils/logger';

export const createOrder = async order_data => {
  logger.debug(`in createOrder`);
  const order_id = id_gen();
  const orderObject = { _id: order_id, ...order_data };

  logger.debug(JSON.stringify(orderObject));

  try {
  //  await UserOrder.create(orderObject);
    return order_id;
  } catch (err) {
    return Promise.reject('Error creating Order', err);
  }
};
