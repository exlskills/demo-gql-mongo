import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { NodeInterface } from './node-definitions-type';
import { ItemPriceType } from './item-price-type';

export const ItemType = new GraphQLObjectType({
  name: 'Item',
  description: 'Item',
  fields: () => ({
    id: globalIdField('Item', obj => obj._id),
    desc: {
      type: GraphQLString
    },
    item_category: {
      type: GraphQLString
    },
    item_price: {
      type: new GraphQLList(ItemPriceType)
    },
    item_details: {
      type: GraphQLString
    }
  }),
  interfaces: [NodeInterface]
});

export const { connectionType: ItemConnection } = connectionDefinitions({
  name: 'Item',
  nodeType: ItemType
});
