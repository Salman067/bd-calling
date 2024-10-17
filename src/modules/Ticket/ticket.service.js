import mongoose from "mongoose";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError.js";
import { Train } from "../Train/train.model.js";
import { Wallet } from "../Wallet/wallet.model.js";
import { generateTicketNumber } from "../../helpers/generateTicketNumber.js";
import { Ticket } from "./ticket.model.js";
import { User } from "../User/user.model.js";

const FARE_PER_STATION = 50;

const calculateTicketPriceFromDB = async (payload) => {
  const train = await Train.findById(payload.trainId);

  if (!train) {
    throw new ApiError(httpStatus.NOT_FOUND, "Train not found!");
  }

  const stops = train.stops;

  const stationCodes = stops.map((stop) => stop.stationCode);

  const fromIndex = stationCodes.indexOf(payload.fromStation);
  const toIndex = stationCodes.indexOf(payload.toStation);
  if (fromIndex === -1 || toIndex === -1) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid stations provided.");
  }

  if (fromIndex >= toIndex) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'The "fromStation" must be before the "toStation".'
    );
  }

  const numberOfStations = toIndex - fromIndex;
  const price = numberOfStations * FARE_PER_STATION * payload.seatNumber.length;
  return { price };
};

const purchaseTicketFromDB = async (user,payload) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingUser = await User.findOne({ _id: user.userId });
    if (!existingUser) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
    }
    const train = await Train.findById(payload.trainId).session(session);
    if (!train) {
      throw new ApiError(httpStatus.NOT_FOUND, "Train not found!");
    }
    if (
      typeof train.availableSeats !== "number" ||
      isNaN(train.availableSeats)
    ) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Invalid available seats value!"
      );
    }

    if (
      train.availableSeats <= 0 ||
      payload.seatNumber.length > train.availableSeats
    ) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "No available seats on this train!"
      );
    }

    const { price } = await calculateTicketPriceFromDB(payload);

    const wallet = await Wallet.findOne({ userId: existingUser._id }).session(
      session
    );
    if (!wallet) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Wallet not found for this user!"
      );
    }

    if (wallet.balance < price) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient funds!");
    }

    wallet.balance -= price;
    wallet.transactions.push({
      amount: -price,
      date: new Date(),
      type: "debit",
      ref: "Ticket Purchased",
    });
    await wallet.save({ session });

    train.availableSeats = train.availableSeats - payload.seatNumber.length;
    await train.save({ session });

    const ticketNumber = generateTicketNumber(
      payload.fromStation,
      payload.toStation
    );

    const ticketPayload = {
      ...payload,
      userId: existingUser._id,
      price,
      purchaseDate: new Date(),
      ticketNumber,
      status: "booked",
    };

    const result = await Ticket.create([ticketPayload], { session });

    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

const deleteTicketFromDB = async (ticketId) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const ticket = await Ticket.findById(ticketId).session(session);
    if (!ticket) {
      throw new ApiError(httpStatus.NOT_FOUND, "Ticket not found!");
    }

    const train = await Train.findById(ticket.trainId).session(session);
    if (!train) {
      throw new ApiError(httpStatus.NOT_FOUND, "Train not found!");
    }

    train.availableSeats += ticket.seatNumber.length;
    await train.save({ session });

    const wallet = await Wallet.findOne({ userId: ticket.userId }).session(
      session
    );
    if (!wallet) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Wallet not found for this user!"
      );
    }

    wallet.balance += ticket.price;
    wallet.transactions.push({
      amount: ticket.price,
      date: new Date(),
      type: "credit",
      ref: "Ticket Cancellation",
    });
    await wallet.save({ session });

    ticket.status = "cancelled";
    await ticket.save({ session });
    await Ticket.findByIdAndDelete(ticketId, { session });
    await session.commitTransaction();

    return ticket;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

async function availableTrainsBetweenStationsFromDB(fromStation) {
  return await Train.find({
    stops: { $elemMatch: { stationCode: fromStation } }
  });
}


export const TicketServices = {
  calculateTicketPriceFromDB,
  purchaseTicketFromDB,
  deleteTicketFromDB,
  availableTrainsBetweenStationsFromDB,
};
