import { Router } from "express";
import { TrainControllers } from "./train.controller.js";
import isAdmin from "../../middlewares/isAdmin.js";
import validateAuth from "../../middlewares/validateAuth.js";

const router = Router();

router.get("/", validateAuth(), TrainControllers.getAllTrains);
router.get("/:trainId", validateAuth(), TrainControllers.getSingleTrain);

router.post("/create", isAdmin(), TrainControllers.createTrain);

router.patch("/update/:trainId", isAdmin(), TrainControllers.updateTrain);

export const TrainRoutes = router;
