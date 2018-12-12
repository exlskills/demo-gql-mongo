import { GraphQLFloat, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

export const ItemPriceType = new GraphQLObjectType({
  name: 'ItemPriceType',
  description: 'Item Price',
  fields: () => ({
    amount: {
      type: GraphQLFloat
    },
    discount_schema: {
      type: GraphQLString
    },
    valid_from: {
      type: GraphQLDateTime
    },
    valid_to: {
      type: GraphQLDateTime
    }
  })
});
