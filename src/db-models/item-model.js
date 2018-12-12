import mongoose from 'mongoose';
import { id_gen } from '../utils/url-id-generator';
import ItemPrice from './item-price-model';

const ItemSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: id_gen
    },
    desc: {
      type: String,
      required: true
    },
    item_category: {
      type: String,
      required: true,
      index: true
    },
    item_details: {
      type: Object,
      default: {}
    },
    item_price: {
      type: [ItemPrice],
      required: true
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default mongoose.model('Item', ItemSchema, 'item');
