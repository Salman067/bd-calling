import { Router } from 'express';
import { TicketControllers } from './ticket.controller.js';
import validateAuth from '../../middlewares/validateAuth.js';
import  USER_ROLE  from '../User/user.constant.js';

const router = Router();

router.post('/calculate-price', TicketControllers.calculateTicketPrice);

router.post(
  '/purchase',
  // validateAuth(USER_ROLE.admin, USER_ROLE.user),
  TicketControllers.purchaseTicket,
);

router.delete(
  '/:ticketId',
  // validateAuth(USER_ROLE.admin, USER_ROLE.user), // Uncomment if you want to restrict access based on roles
  TicketControllers.deleteTicket
);

export const TicketRoutes = router;
