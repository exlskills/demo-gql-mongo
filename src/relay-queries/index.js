import user from './user';
import item from './item';

export default {
  getItem: item.getItem,
  getUser: user.getUser,
  listUsers: user.listUsers,
  listUserOrders: user.listUserOrders
};
