import { Router } from "express";
import { TrainScheduleControllers } from "./train.schedule.controller.js";
import validateAuth from "../../middlewares/validateAuth.js";
import isAdmin from "../../middlewares/isAdmin.js";

const router = Router();

router.get("/", validateAuth(), TrainScheduleControllers.getTrainSchedule);

router.get(
  "/:trainCode",
  validateAuth(),
  TrainScheduleControllers.getSingleTrainSchedule
);

router.post("/create", isAdmin(), TrainScheduleControllers.addTrainSchedule);

router.patch(
  "/update/:scheduleId",
  isAdmin(),
  TrainScheduleControllers.updateTrainSchedule
);

export const ScheduleRout = router;
