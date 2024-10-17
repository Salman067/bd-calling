import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync.js';
import sendResponse from '../../helpers/sendResponse.js';
import {TrainScheduleServices} from './train.schedule.service.js'
import cron from 'node-cron';


const addTrainSchedule = catchAsync(async (req, res) => {
  const result = await TrainScheduleServices.createTrainScheduleFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Train Schedule created successfully!',
    data: result,
  });
});

const getTrainSchedule = catchAsync(async (req, res) => {
  const result = await TrainScheduleServices.getAllTrainScheduleFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All train schedule retrieved successfully!',
    data: result,
  });
});

const getSingleTrainSchedule = catchAsync(async (req, res) => {
  const result = await TrainScheduleServices.getSingleTrainScheduleFromDB(req.params.trainCode);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train retrieved successfully!',
    data: result,
  });
});

const updateTrainSchedule = catchAsync(async (req, res) => {
  const result = await TrainScheduleServices.updateTrainScheduleFromDB(
    req.params.scheduleId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train updated successfully!',
    data: result,
  });
});

// // Schedule the cron job to run every minute
// cron.schedule('* * * * *', async () => {
//   console.log('Running cron job to fetch all train schedule...');
//   try {
//     const trainSchedule = await TrainScheduleServices.getAllTrainScheduleFromDB();
//     console.log('Fetched all train schedule:', trainSchedule);
//   } catch (error) {
//     console.error('Error during cron job:', error);
//   }
// });

export const TrainScheduleControllers = {
    addTrainSchedule,
  getTrainSchedule,
  getSingleTrainSchedule,
  updateTrainSchedule,
};
