import httpStatus from "http-status";
import ApiError from "../../errors/ApiError.js";
import { Train } from "../Train/train.model.js";
import { Station } from "../Station/station.model.js";
import { TrainSchedule } from "./train.schedule.model.js";

const createTrainScheduleFromDB = async (payload) => {
  try {
    const train = await Train.findOne({ trainCode: payload.trainCode });
    if (!train) {
      throw new ApiError(httpStatus.CONFLICT, "Train not found!");
    }

    const station = await Station.findOne({ stationCode: payload.stationCode });
    if (!station) {
      throw new ApiError(httpStatus.CONFLICT, "Station not found!");
    }

    const trainSchedulePayload = { ...payload };

    const result = await TrainSchedule.create(trainSchedulePayload);
    return result;

  } catch (error) {
    console.error('Error creating train schedule:', error.message);
    throw new ApiError(httpStatus.BAD_REQUEST, "Error creating train schedule!");
  }
};

const getAllTrainScheduleFromDB = async () => {
  const result = await TrainSchedule.find();
  return result;
};

const getSingleTrainScheduleFromDB = async (trainCode) => {
  const result = await TrainSchedule.findOne({trainCode:trainCode});
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Train Schedule not found!");
  }

  return result;
};

const updateTrainScheduleFromDB = async (scheduleId, payload) => {
  const train = await Train.findOne({ trainCode: payload.trainCode });
  if (!train) {
    throw new ApiError(httpStatus.CONFLICT, "Train not found!");
  }
  for (const stop of train.stops) {
    if (!(await Station.isStationExistsByStationCode(stop.stationCode))) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        `Station with code ${stop.stationCode} does not exist!`
      );
    }
  }

  const updatedSchedule = await TrainSchedule.findByIdAndUpdate(
    { _id: scheduleId },
    payload,
    {
      new: true,
    }
  );

  if (!updatedSchedule) {
    throw new ApiError(httpStatus.NOT_FOUND, "Train schedule not found with this ID!");
  }

  return updatedSchedule;
};

export const TrainScheduleServices = {
  createTrainScheduleFromDB,
  getAllTrainScheduleFromDB,
  getSingleTrainScheduleFromDB,
  updateTrainScheduleFromDB,
};
