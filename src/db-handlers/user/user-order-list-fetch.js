import { logger } from '../../utils/logger';
import UserOrder from '../../db-models/user-order-model';

export const fetchUserOrderList = async (
  filterValues,
  aggregateArray,
  viewerLocale,
  fetchParameters
) => {
  logger.debug(`in fetchUserOrderList`);
  logger.debug(`   aggregateArray ` + JSON.stringify(aggregateArray));

  let queryFunc = UserOrder.find({ user_id: fetchParameters.user_id }).select({
    order_items: 0
  });

  const sort = aggregateArray.find(item => !!item.$sort);
  if (sort) {
    queryFunc = queryFunc.sort(sort.$sort);
  }
  const skip = aggregateArray.find(item => !!item.$skip);
  if (skip) {
    queryFunc = queryFunc.skip(skip.$skip);
  }
  const limit = aggregateArray.find(item => !!item.$limit);
  if (limit) {
    queryFunc = queryFunc.limit(limit.$limit);
  }

  let userOrderArray;
  try {
    userOrderArray = await queryFunc.exec();
  } catch (err) {}
  logger.debug(`  userOrderArray ` + userOrderArray);

  return userOrderArray;
};
