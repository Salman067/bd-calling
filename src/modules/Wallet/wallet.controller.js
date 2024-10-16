import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync.js';
import sendResponse from '../../helpers/sendResponse.js';
import { WalletServices } from './wallet.service.js'; 

const getWallet = catchAsync(async (req, res) => {
  // const existingUser= await User.findOne({_id:req.body.userId});
  // if (!existingUser) {
  //   return sendResponse(res, {
  //     statusCode: httpStatus.NOT_FOUND,
  //     success: false,
  //     message: 'User not found!',
  //   });
  // }
  const result = await WalletServices.getWalletByUserIdFromDB(req.body.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wallet retrieved successfully!',
    data: result,
  });
});

const addFunds = catchAsync(async (req, res) => {
  // const existingUser= await User.findOne({_id:req.body.userId});
  // if (!existingUser) {
  //   return sendResponse(res, {
  //     statusCode: httpStatus.NOT_FOUND,
  //     success: false,
  //     message: 'User not found!',
  //   });
  // }
  const result = await WalletServices.addFundsToWalletFromDB(req.body);

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
