import { toGlobalId } from 'graphql-relay';
import * as UserCud from '../db-handlers/user/user-cud';
import { logger } from '../utils/logger';
import { basicFind } from '../db-handlers/basic-query-handler';
import User from '../db-models/user-model';

export const createUser = async (inputFields, viewer, info) => {
  logger.debug(`in createUser mag`);

  const user_data = inputFields.user_data;
  logger.debug(`user data ` + JSON.stringify(user_data));

  try {
    const conditionsToCheck = [
      {
        match: { username: user_data.username },
        msg_id: 'DU01',
        msg: 'Username already exist'
      },
      {
        match: { primary_email: user_data.primary_email },
        msg_id: 'DU02',
        msg: 'Primary email found in another existing profile'
      }
    ];
    for (let condition of conditionsToCheck) {
      let user_rec;
      try {
        user_rec = await basicFind(
          User,
          {
            isOne: true
          },
          condition.match,
          null,
          { _id: 1 }
        );
      } catch (alreadyRecorded) {}
      if (user_rec) {
        return {
          completionObj: {
            code: '1',
            msg_id: condition.msg_id,
            msg: condition.msg,
            processed: 0,
            modified: 0
          }
        };
      }
    }

    const user_id_db = await UserCud.createUser(user_data);
    const user_id = toGlobalId('User', user_id_db);
    return {
      user_id: user_id,
      completionObj: {
        code: '0',
        msg_id: '001',
        msg: 'User created',
        processed: 1,
        modified: 0
      }
    };
  } catch (error) {
    const msg = error.message ? error.message : error;
    return {
      completionObj: {
        code: '1',
        msg_id: 'EU01',
        msg: msg,
        processed: 0,
        modified: 0
      }
    };
  }
};
