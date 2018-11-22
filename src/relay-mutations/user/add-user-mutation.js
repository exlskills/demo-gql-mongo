import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';

import { CompletionObjType } from '../../relay-models/completion-obj-type';
import { addUser } from '../../relay-mutate-and-get/user-mag';

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
  name: 'AddUser',
  inputFields: {
    locale: {
      type: GraphQLString
    },
    profile: {
      type: UserInputType
    }
  },
  outputFields: {
    completionObj: { type: CompletionObjType }
  },
  mutateAndGetPayload: ({ locale, profile }, viewer, info) =>
    addUser(locale, profile).then(returnObj => returnObj)
});
