import userMutations from './user';
import orderMutations from './order';

export default {
  createUser: userMutations.createUser,
  createOrder: orderMutations.createOrder
};
