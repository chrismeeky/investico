import { Schema, model } from 'mongoose';

const stockSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  tradingCode: {
    type: String,
    required: true,
    max: 3,
  },
  companyName: {
    type: String,
    required: true,
    max: 20,
  },
  unitPrice: {
    type: Number,
    required: true,
    max: 255,
  },
  volume: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = model('Stock', stockSchema);
