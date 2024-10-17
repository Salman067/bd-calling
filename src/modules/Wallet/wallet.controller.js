import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync.js';
import sendResponse from '../../helpers/sendResponse.js';
import { WalletServices } from './wallet.service.js'; 

const getWallet = catchAsync(async (req, res) => {
  const result = await WalletServices.getWalletByUserIdFromDB(req.user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wallet retrieved successfully!',
    data: result,
  });
});

const addFunds = catchAsync(async (req, res) => {
  console.log("jh",req.user)
  const result = await WalletServices.addFundsToWalletFromDB(req.user.userId,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Funds added successfully!',
    data: result,
  });
});

export const WalletControllers = {
  getWallet,
  addFunds,
};
