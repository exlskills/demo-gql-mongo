import User from '../../db-models/user-model';
import { id_gen } from '../../utils/url-id-generator';
import { logger } from '../../utils/logger';
import { basicFind } from '../basic-query-handler';

export const createUser = async user_data => {
  logger.debug(`in createUser`);
  let user_id = id_gen();
  while (true) {
    let user_rec = null;
    try {
      user_rec = await basicFind(
        User,
        {
          isById: true
        },
        user_id,
        null,
        { _id: 1 }
      );
    } catch (alreadyRecorded) {}
    if (!user_rec || !user_rec._id) {
      logger.debug(`assigned User id ` + user_id);
      break;
    } else {
      user_id = id_gen();
    }
  }

  const userObject = { _id: user_id, ...user_data };

  try {
    await User.create(userObject);
    return user_id;
  } catch (err) {
    logger.error('While Creating User ' + err);
    return Promise.reject('Error creating User', err);
  }
};
