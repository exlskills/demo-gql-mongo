import { UserOrderConnection } from '../../relay-models/user-order-type';
import * as inputTypes from '../input-types-get-query';
import { connectionArgs } from 'graphql-relay';
import { GraphQLNonNull, GraphQLID } from 'graphql';
import { resolveListUserOrders } from '../../relay-resolvers/user-order-resolver';

export const listUserOrders = {
  type: UserOrderConnection,
  description: 'User Orders',
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
    user_id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    ...connectionArgs
  },
  resolve: (obj, args, viewer, info) =>
    resolveListUserOrders(obj, args, viewer, info)
};
