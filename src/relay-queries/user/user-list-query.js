import { UserConnection } from '../../relay-models/user-type';
import * as inputTypes from '../input-types-get-query';
import { connectionArgs } from 'graphql-relay';
import { resolveListUsers } from '../../relay-resolvers/user-resolver';

export const listUsers = {
  type: UserConnection,
  description: 'Users',
  args: {
    orderBy: {
      type: inputTypes.OrderByType
    },
    filterValues: {
      type: inputTypes.FilterValuesType
    },
    resolverArgs: {
      type: inputTypes.QueryResolverArgsType
    },
    ...connectionArgs
  },
  resolve: (obj, args, viewer, info) =>
    resolveListUsers(obj, args, viewer, info)
};
