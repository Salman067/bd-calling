import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError.js'; 
import { Wallet } from './wallet.model.js'; 
import {User} from '../User/user.model.js';


const getWalletByUserIdFromDB = async (userId) => {
  const existingUser = await User.findOne({_id:userId});
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found for this email!');
  }

  const wallet = await Wallet.findOne({ userId: existingUser._id });

  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found for this user!');
  }
  return wallet;
};

const addFundsToWalletFromDB = async (payload) => {
  const existingUser= await User.findOne({_id:payload.userId});
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found for this id!');
  }
  const wallet = await Wallet.findOne({ userId: existingUser._id });
  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found for this user!');
  }

  wallet.balance += payload.amount;
  wallet.transactions.push({
    amount: payload.amount,
    date: new Date(),
    type: 'credit',
    ref: 'Add Money',
  });
  await wallet.save();
  return wallet;
};

export const WalletServices = {
  getWalletByUserIdFromDB,
  addFundsToWalletFromDB,
};
