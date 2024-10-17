import { Router } from "express";
import { TicketControllers } from "./ticket.controller.js";
import isAdmin from "../../middlewares/isAdmin.js";
import validateAuth from "../../middlewares/validateAuth.js";

const router = Router();

router.get(
  "/trains-between-stations",
  validateAuth(),
  TicketControllers.availableTrainsBetweenStations
);
router.post(
  "/calculate-price",
  validateAuth(),
  TicketControllers.calculateTicketPrice
);

router.post("/purchase", validateAuth(), TicketControllers.purchaseTicket);

router.delete("/:ticketId", isAdmin(), TicketControllers.deleteTicket);

export const TicketRoutes = router;
