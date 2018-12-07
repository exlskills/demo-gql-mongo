import { GraphQLObjectType, GraphQLString, GraphQLFloat } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { NodeInterface } from './node-definitions-type';

export const OrderItemType = new GraphQLObjectType({
  name: 'OrderItem',
  description: 'Order Item',
  fields: () => ({
    id: globalIdField('OrderItem', obj => obj._id),
    item_id: globalIdField('Item', obj => obj.item_id),
    desc: {
      type: GraphQLString
    },
    item_category: {
      type: GraphQLString
    },
    quantity: {
      type: GraphQLFloat
    },
    amount: {
      type: GraphQLFloat
    },
    item_details: {
      type: GraphQLString
    }
  }),
  interfaces: [NodeInterface]
});

export const { connectionType: OrderItemConnection } = connectionDefinitions({
  name: 'OrderItem',
  nodeType: OrderItemType
});
