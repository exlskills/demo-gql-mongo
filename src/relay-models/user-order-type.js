import { GraphQLObjectType } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  globalIdField
} from 'graphql-relay';
import { NodeInterface } from './node-definitions-type';
import { GraphQLDateTime } from 'graphql-iso-date';
import { OrderItemConnection } from './order-item-type';
import { resolveListOrderItems } from '../relay-resolvers/order-item-resolver';
import * as inputTypes from '../relay-queries/input-types-get-query';

export const UserOrderType = new GraphQLObjectType({
  name: 'UserOrder',
  description: 'User Order',
  fields: () => ({
    id: globalIdField('UserOrder', obj => obj._id),
    user_id: globalIdField('User', obj => obj.user_id),
    payer_id: globalIdField('User', obj => obj.payer_id),
    order_date: {
      type: GraphQLDateTime
    },
    order_items: {
      type: OrderItemConnection,
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
        resolveListOrderItems(obj, args, viewer, info),
      description: 'Order items'
    }
  }),
  interfaces: [NodeInterface]
});

export const { connectionType: UserOrderConnection } = connectionDefinitions({
  name: 'UserOrder',
  nodeType: UserOrderType
});
