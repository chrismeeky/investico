import { Schema, model } from 'mongoose';

const profileSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  tradingCode: {
    type: String,
    required: true,
    max: 3,
  },
  numberOfUnits: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = model('Profile', profileSchema);
