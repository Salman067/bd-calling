import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError.js';
import { User } from './user.model.js'; 
import bcrypt from 'bcrypt';
import config from '../../config/index.js';
import { Wallet } from '../Wallet/wallet.model.js';
import createToken from '../../helpers/createToken.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const registerUserFromDB = async (payload) => {
  const session = await mongoose.startSession();

  if (await User.isUserExistsByEmail(payload?.email)) {
    throw new ApiError(httpStatus.CONFLICT, 'User already exists!');
  }

  try {
    session.startTransaction();

    const userPayload = {
      ...payload,
      role: 'user',
      status: 'in-progress',
      isBlocked: false,
      isDeleted: false,
    };

    const newUser = await User.create([userPayload], { session });

    const walletPayload = {
      userId: newUser[0]._id,
      balance: 50,
      transactions: [
        {
          amount: 50,
          date: new Date(),
          type: 'credit',
          ref: 'New Account Bonus!',
        },
      ],
    };

    const newWallet = await Wallet.create([walletPayload], { session });

    await session.commitTransaction();
    await session.endSession();

    return {
      user: newUser,
      wallet: newWallet,
    };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const loginUserFromDB = async (payload) => {
  const existingUser = await User.isUserExistsByEmail(payload?.email);

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User with this email does not exist.');
  }

  const isPasswordValid = await bcrypt.compare(payload?.password, existingUser?.password);

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid username or password');
  }

  const jwtPayload = {
    userId: existingUser?._id,
    fullName: existingUser?.fullName,
    email: existingUser?.email,
    role: existingUser?.role,
  };
  const accessToken = createToken(jwtPayload, config.jwtAccessSecret, config.jwtAccessExpiresIn);
  return {
    accessToken,
  };
};

const getAllUser = async (paginationParameter) => {
  const allUser = await User.find();

  return {
      users: allUser,
  };
}


export const UserServices = {
  registerUserFromDB,
  loginUserFromDB,
  getAllUser,
};
