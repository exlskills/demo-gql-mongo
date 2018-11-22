import mongoose from 'mongoose';

export default new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
      auto: true
    },
    item_options: {
      type: Object,
      default: {}
    },
    item_id: {
      type: String,
      required: true,
      index: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    amount: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);
