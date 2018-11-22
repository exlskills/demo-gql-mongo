import { toGlobalId } from 'graphql-relay';
import * as UserCud from '../db-handlers/user/user-cud';
import { logger } from '../utils/logger';

export const createUser = async (user_data, viewer, info) => {
  logger.debug(`in createUser mag`);
  try {
    const user_id_db = await UserCud.createUser(user_data);
    const user_id = toGlobalId('User', user_id_db);
    return { user_id: user_id, completionObj: { code: '0', msg: '' } };
  } catch (error) {
    return { completionObj: { code: '1', msg: error.message } };
  }
};
