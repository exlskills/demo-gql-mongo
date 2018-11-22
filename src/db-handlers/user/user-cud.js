import User from '../../db-models/user-model';
import { id_gen } from '../../utils/url-id-generator';
import { logger } from '../../utils/logger';

export const createUser = async userObject => {
  logger.debug(`in createUser`);
  const user_id = id_gen();
  userObject._id = user_id;
  try {
    await User.create(userObject);
    return user_id;
  } catch (err) {
    return Promise.reject('Error adding to DB', err);
  }
};
