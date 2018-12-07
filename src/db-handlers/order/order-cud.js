import { basicFind } from '../basic-query-handler';
import UserOrder from '../../db-models/user-order-model';
import { id_gen } from '../../utils/url-id-generator';
import { logger } from '../../utils/logger';

export const createOrder = async order_data => {
  logger.debug(`in createOrder`);
  let order_id = id_gen();
  while (true) {
    let order_rec = null;
    try {
      order_rec = await basicFind(
        UserOrder,
        {
          isById: true
        },
        order_id,
        null,
        { _id: 1 }
      );
    } catch (alreadyRecorded) {}
    if (!order_rec || !order_rec._id) {
      logger.debug(`assigned Order id ` + order_id);
      break;
    } else {
      order_id = id_gen();
    }
  }
  const orderObject = { _id: order_id, ...order_data };

  logger.debug(JSON.stringify(orderObject));

  try {
    await UserOrder.create(orderObject);
    logger.debug('Order created with id ' + order_id);
    return order_id;
  } catch (err) {
    return Promise.reject('Error creating Order', err);
  }
};
