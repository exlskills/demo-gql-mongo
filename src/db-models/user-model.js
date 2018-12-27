import mongoose from 'mongoose';
import { id_gen } from '../utils/url-id-generator';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: id_gen
    },
    full_name: {
      type: String
    },
    username: {
      type: String,
      index: true,
      unique: true
    },
    primary_email: {
      type: String,
      index: true,
      unique: true
    },
    primary_locale: {
      type: String,
      default: 'en',
      required: true
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default mongoose.model('User', UserSchema, 'user');
