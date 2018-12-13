import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { CompletionObjType } from '../../relay-models/completion-obj-type';
import { createUser } from '../../relay-mutate-and-get/user-mag';
import { logger } from '../../utils/logger';

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'User',
  fields: () => ({
    full_name: { type: GraphQLString },
    username: { type: new GraphQLNonNull(GraphQLString) },
    primary_email: { type: new GraphQLNonNull(GraphQLString) },
    primary_locale: { type: GraphQLString }
  })
});

export default mutationWithClientMutationId({
  name: 'CreateUser',
  inputFields: {
    user_data: {
      type: UserInputType
    }
  },
  outputFields: {
    user_id: { type: GraphQLID },
    completionObj: { type: CompletionObjType }
  },
  mutateAndGetPayload: (inputFields, viewer, info) => {
    logger.debug(`in mutateAndGetPayload Create User `);
    logger.debug(`  inputFields ` + JSON.stringify(inputFields));
    logger.debug(`  viewer ` + JSON.stringify(viewer));
    logger.debug(`  info ` + JSON.stringify(info));
    return createUser(inputFields, viewer, info);
  }
});
