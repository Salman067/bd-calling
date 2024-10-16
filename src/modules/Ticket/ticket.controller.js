import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync.js';
import sendResponse from '../../helpers/sendResponse.js';
import { TicketServices } from './ticket.service.js';
import { User } from '../User/user.model.js';

const calculateTicketPrice = catchAsync(async (req, res) => {
  const result = await TicketServices.calculateTicketPriceFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket price calculated successfully!',
    data: result,
  });
});

const purchaseTicket = catchAsync(async (req, res) => {
  const existingUser = await User.findOne({_id:req.body.userId})
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
    message: 'Ticket purchased successfully!',
    data: result,
  });
});

const deleteTicket = catchAsync(async (req, res) => {
  const { ticketId } = req.params;
  const deletedTicket = await TicketServices.deleteTicketFromDB(ticketId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket deleted successfully!',
    data: deletedTicket,
  });
});

export const TicketControllers = {
  calculateTicketPrice,
  purchaseTicket,
  deleteTicket,
};
