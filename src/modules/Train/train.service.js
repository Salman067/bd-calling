import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError.js';
import { Train } from './train.model.js'; 
import { Station } from '../Station/station.model.js';
import { User } from '../User/user.model.js';

const createTrainFromDB = async (user,payload) => {
  const existingUser = await User.findOne({ _id: user.userId });
  if (!existingUser) {
    throw new ApiError(httpStatus.CONFLICT, 'User not found!!');
  }

  if (await Train.isTrainExistsByTrainCode(payload.trainCode)) {
    throw new ApiError(httpStatus.CONFLICT, 'Train already exists!');
  }

  for (const stop of payload.stops) {
    if (!(await Station.isStationExistsByStationCode(stop.stationCode))) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        `Station with code ${stop.stationCode} does not exist!`,
      );
    }
  }

  const stationCodes = payload.stops.map((stop) => stop.stationCode);
  const uniqueStationCodes = new Set(stationCodes);
  if (stationCodes.length !== uniqueStationCodes.size) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Duplicate station found in the stops!',
    );
  }

  const trainPayload = {
    ...payload,
    availableSeats:payload.capacity,
    createdBy: existingUser._id, 
  };

  const result = await Train.create(trainPayload);
  return result;
};

const getAllTrainsFromDB = async () => {
  const result = await Train.find();
  return result;
};

const getSingleTrainFromDB = async (trainId) => {
  const result = await Train.findById(trainId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Train not found with this ID!');
  }

  return result;
};

const updateTrainFromDB = async (trainId, payload) => {
  const stationCodes = payload.stops.map((stop) => stop.stationCode);
  const uniqueStationCodes = new Set(stationCodes);
  if (stationCodes.length !== uniqueStationCodes.size) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Duplicate station codes found in the schedule!',
    );
  }

  for (const stop of payload.stops) {
    if (!(await Station.isStationExistsByStationCode(stop.stationCode))) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        `Station with code ${stop.stationCode} does not exist!`,
      );
    }
  }

  const result = await Train.findByIdAndUpdate(trainId, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Train not found with this ID!');
  }

  return result;
};

export const TrainServices = {
  createTrainFromDB,
  getAllTrainsFromDB,
  getSingleTrainFromDB,
  updateTrainFromDB,
};
