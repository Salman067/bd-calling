import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError.js';
import { Station } from './station.model.js';
import { User } from '../User/user.model.js';

const createStationFromDB = async (payload) => {
  const existingUser = await User.findOne({ _id: payload.createdBy });
  if (!existingUser){
    throw new ApiError(httpStatus.NOT_FOUND,'User not found!')
  }

  if (await Station.isStationExistsByStationCode(payload.stationCode)) {
    throw new ApiError(httpStatus.CONFLICT, 'Station already exists!');
  }
  const stationPayload = {
    ...payload,
    createdBy: existingUser._id,
  };

  const result = await Station.create(stationPayload);
  return result;
};

const getAllStationsFromDB = async () => {
  const result = await Station.find();
  return result;
};

const getSingleStationFromDB = async (stationId) => {
  const result = await Station.findById(stationId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Station not found with this ID!');
  }

  return result;
};

const updateStationFromDB = async (stationId, payload) => {
  const result = await Station.findByIdAndUpdate(stationId, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Station not found with this ID!');
  }

  return result;
};

export const StationServices = {
  createStationFromDB,
  getAllStationsFromDB,
  getSingleStationFromDB,
  updateStationFromDB,
};
