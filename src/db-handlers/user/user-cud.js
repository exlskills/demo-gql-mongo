import User from '../../db-models/user-model';
import { id_gen } from '../../utils/url-id-generator';
import { logger } from '../../utils/logger';

export const createUser = async user_data => {
  logger.debug(`in createUser`);
  const user_id = id_gen();
  const userObject = { _id: user_id, ...user_data };
  try {
    await User.create(userObject);
    return user_id;
  } catch (err) {
    return Promise.reject('Error creating User', err);
  }
};
