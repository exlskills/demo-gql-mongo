import mongoose from 'mongoose';

export default new mongoose.Schema(
  {
    _id: false,
    amount: {
      type: Number,
      required: true
    },
    discount_schema: {
      type: String,
      default: 'Volume'
    },
    valid_from: {
      type: Date,
      default: new Date(Date.UTC(2018, 1, 1))
    },
    valid_to: {
      type: Date
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);
