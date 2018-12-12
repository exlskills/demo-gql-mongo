import { GraphQLID } from 'graphql';
import { resolveItem } from '../../relay-resolvers/item-resolver';
import { ItemType } from '../../relay-models/item-type';

export const getItem = {
  type: ItemType,
  args: {
    item_id: {
      type: GraphQLID
    }
  },
  resolve: resolveItem
};
