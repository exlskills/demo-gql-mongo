import { logger } from '../../utils/logger';
import UserOrder from '../../db-models/user-order-model';

export const fetchOrderItemList = async (
  filterValues,
  aggregateArray,
  viewerLocale,
  fetchParameters
) => {
  logger.debug(`in fetchOrderItemList`);
  logger.debug(`   aggregateArray ` + JSON.stringify(aggregateArray));

  let elem,
    agrArray = [];
  try {
    elem = {
      $match: {
        _id: fetchParameters._id
      }
    };
    agrArray.push(elem);

    elem = {
      $project: {
        _id: 0,
        order_items: 1
      }
    };
    agrArray.push(elem);

    elem = {
      $unwind: '$order_items'
    };
    agrArray.push(elem);

    elem = {
      $project: {
        item_id: '$order_items.item_id',
        quantity: '$order_items.quantity',
        amount: '$order_items.amount',
        item_details_as_ordered: '$order_items.item_details'
      }
    };
    agrArray.push(elem);

    let array_lookup = [];
    elem = {
      $match: {
        $expr: {
          $eq: ['$_id', '$$item_id']
        }
      }
    };
    array_lookup.push(elem);

    elem = {
      $project: {
        desc: 1,
        item_category: 1,
        item_details: 1
      }
    };
    array_lookup.push(elem);

    elem = {
      $lookup: {
        from: 'item',
        let: { item_id: '$item_id' },
        pipeline: array_lookup,
        as: 'item'
      }
    };
    agrArray.push(elem);

    elem = {
      $unwind: '$item'
    };
    agrArray.push(elem);

    elem = {
      $project: {
        item_id: 1,
        quantity: 1,
        amount: 1,
        item_details_as_ordered: 1,
        desc: '$item.desc',
        item_category: '$item.item_category',
        item_details_base: '$item.item_details'
      }
    };
    agrArray.push(elem);

    const sort = aggregateArray.find(item => !!item.$sort);
    if (sort) agrArray.push(sort);

    const skip = aggregateArray.find(item => !!item.$skip);
    if (skip) agrArray.push(skip);

    const limit = aggregateArray.find(item => !!item.$limit);
    if (limit) agrArray.push(limit);

  } catch (err) {
    logger.error(`in UserOrder aggregate pipeline build ` + err);
    throw new Error(`query failed`);
  }

  let orderItemArray;
  try {
    orderItemArray = await UserOrder.aggregate(agrArray).exec();
  } catch (err) {
    logger.error(`in UserOrder aggregate ` + err);
    throw new Error(`query failed`);
  }

  logger.debug(`  orderItemArray raw ` + JSON.stringify(orderItemArray));

  try {
    for (let orderItem of orderItemArray) {
      orderItem.item_details = JSON.stringify({
        ...orderItem.item_details_base,
        ...orderItem.item_details_as_ordered
      });
      delete orderItem.item_details_base;
      delete orderItem.item_details_as_ordered;
    }
  } catch (err) {
    logger.error(`in orderItem details processing ` + err);
    throw new Error(`query failed`);
  }

  logger.debug(`  orderItemArray updated ` + JSON.stringify(orderItemArray));

  return orderItemArray;
};
