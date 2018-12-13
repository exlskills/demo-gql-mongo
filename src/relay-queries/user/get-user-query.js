import { GraphQLNonNull, GraphQLString } from 'graphql';
import { resolveGetUser } from '../../relay-resolvers/user-resolver';
import { UserType } from '../../relay-models/user-type';

export const getUser = {
  type: UserType,
  args: {
    item_query: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (obj, args, viewer, info) => resolveGetUser(obj, args, viewer, info)
};
