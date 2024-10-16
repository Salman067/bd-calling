import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync.js';
import sendResponse from '../../helpers/sendResponse.js';
import { TrainServices } from './train.service.js';
import cron from 'node-cron';
import { User } from '../User/user.model.js';

const createTrain = catchAsync(async (req, res) => {
    const existingUser = await User.findOne({ _id: req.body.createdBy });
    if (!existingUser) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'User not found!',
      });
    }
  
  const result = await TrainServices.createTrainFromDB(existingUser, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Train created successfully!',
    data: result,
  });
});

const getAllTrains = catchAsync(async (req, res) => {
  const result = await TrainServices.getAllTrainsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All trains retrieved successfully!',
    data: result,
  });
});

const getSingleTrain = catchAsync(async (req, res) => {
  const result = await TrainServices.getSingleTrainFromDB(req.params.trainId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train retrieved successfully!',
    data: result,
  });
});

const updateTrain = catchAsync(async (req, res) => {
  const result = await TrainServices.updateTrainFromDB(
    req.params.trainId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train updated successfully!',
    data: result,
  });
});

// Schedule the cron job to run every minute
cron.schedule('* * * * *', async () => {
  console.log('Running cron job to fetch all trains...');
  try {
    const trains = await TrainServices.getAllTrainsFromDB();
    console.log('Fetched all trains:', trains);
  } catch (error) {
    console.error('Error during cron job:', error);
  }
});

export const TrainControllers = {
  createTrain,
  getAllTrains,
  getSingleTrain,
  updateTrain,
};
