import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true,
  },
  ref: {
    type: String,
  },
});

const walletSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    transactions: {
      type: [transactionSchema],
      default: [],
    },
  },
  { timestamps: true } 
);

export const Wallet = model('Wallet', walletSchema);
