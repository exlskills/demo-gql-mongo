import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat
} from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLDateTime } from 'graphql-iso-date';
import { CompletionObjType } from '../../relay-models/completion-obj-type';
import { createOrder } from '../../relay-mutate-and-get/order-mag';
import { logger } from '../../utils/logger';

const OrderInputType = new GraphQLInputObjectType({
  name: 'OrderInput',
  description: 'Order',
  fields: () => ({
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    payer_id: { type: GraphQLID },
    order_date: { type: GraphQLDateTime },
    order_items: {
      type: new GraphQLNonNull(new GraphQLList(OrderItemInputType))
    }
  })
});

const OrderItemInputType = new GraphQLInputObjectType({
  name: 'OrderItemInput',
  description: 'OrderItem',
  fields: () => ({
    item_id: { type: new GraphQLNonNull(GraphQLID) },
    quantity: { type: new GraphQLNonNull(GraphQLFloat) },
    amount: { type: GraphQLFloat },
    item_details: { type: GraphQLString }
  })
});

export default mutationWithClientMutationId({
  name: 'CreateOrder',
  inputFields: {
    order_data: {
      type: OrderInputType
    }
  },
  outputFields: {
    order_id: { type: GraphQLID },
    completionObj: { type: CompletionObjType }
  },
  mutateAndGetPayload: (inputFields, viewer, info) => {
    logger.debug(`in mutateAndGetPayload Create Order `);
    logger.debug(`  inputFields ` + JSON.stringify(inputFields));
    const orderObj = {
      order_date: inputFields.order_data.order_date,
      order_items: []
    };
    orderObj.user_id = fromGlobalId(inputFields.order_data.user_id).id;
    orderObj.payer_id = fromGlobalId(inputFields.order_data.payer_id).id;
    for (let item of inputFields.order_data.order_items) {
      const itemObj = { ...item };
      itemObj.item_id = fromGlobalId(item.item_id).id;
      orderObj.order_items.push(itemObj);
    }
    return createOrder(orderObj, viewer);
  }
});
