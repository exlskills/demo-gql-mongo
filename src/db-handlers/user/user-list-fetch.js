import { logger } from '../../utils/logger';
import User from '../../db-models/user-model';

export const fetchUserList = async (
  filterValues,
  aggregateArray,
  viewerLocale,
  fetchParameters
) => {
  logger.debug(`in fetchUserList`);
  logger.debug(`   aggregateArray ` + JSON.stringify(aggregateArray));

  let queryFunc = User.find();

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

  let userArray;
  try {
    userArray = await queryFunc.exec();
  } catch (err) {
    logger.error(`in fetchUserList exec: ` + err);
    throw new Error(`query failed`);
  }
  logger.debug(`  userArray ` + userArray);

  return userArray;
};
