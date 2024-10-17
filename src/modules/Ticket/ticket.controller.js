import httpStatus from "http-status";
import catchAsync from "../../helpers/catchAsync.js";
import sendResponse from "../../helpers/sendResponse.js";
import { TicketServices } from "./ticket.service.js";
import { User } from "../User/user.model.js";

const calculateTicketPrice = catchAsync(async (req, res) => {
  const result = await TicketServices.calculateTicketPriceFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ticket price calculated successfully!",
    data: result,
  });
});

const purchaseTicket = catchAsync(async (req, res) => {
  const existingUser = await User.findOne({ _id: req.body.userId });
  //  if (!existingUser) {
  //   return sendResponse(res, {
  //     statusCode: httpStatus.NOT_FOUND,
  //     success: false,
  //     message: 'User not found!',
  //   });
  // }

  const result = await TicketServices.purchaseTicketFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ticket purchased successfully!",
    data: result,
  });
});

const deleteTicket = catchAsync(async (req, res) => {
  const { ticketId } = req.params;
  const deletedTicket = await TicketServices.deleteTicketFromDB(ticketId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ticket deleted successfully!",
    data: deletedTicket,
  });
});

const availableTrainsBetweenStations = catchAsync(async (req, res) => {
  const { fromStation, toStation } = req.query;
  if (!fromStation || !toStation) {
    return sendResponse(res, {
      statusCode: res.status(400),
      success: false,
      message: 'Both "fromStation" and "toStation" are required.',
    });
  }

  const trains = await TicketServices.availableTrainsBetweenStationsFromDB(fromStation);

  if (!Array.isArray(trains)) {
    return sendResponse(res, {
      statusCode: res.status(500),
      success: false,
      message: "Expected an array of trains but got something else.",
    });
  }

  // Filter the trains to ensure fromStation comes before toStation in the train route
  const validTrains = trains.filter((train) => {
    const stationCodes = train.stops.map((stop) => stop.stationCode);
    const fromIndex = stationCodes.indexOf(fromStation);
    const toIndex = stationCodes.indexOf(toStation);
    return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
  });

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${validTrains.length} trains found between ${fromStation} and ${toStation}.`,
    data: validTrains,
  });
});

export const TicketControllers = {
  calculateTicketPrice,
  purchaseTicket,
  deleteTicket,
  availableTrainsBetweenStations,
};
