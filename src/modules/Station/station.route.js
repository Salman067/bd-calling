import { Router } from "express";
import { StationControllers } from "./station.controller.js";
import validateAuth from "../../middlewares/validateAuth.js";
import isAdmin from "../../middlewares/isAdmin.js";

const router = Router();

router.get("/", validateAuth(), StationControllers.getAllStations);
router.get("/:stationId", validateAuth(), StationControllers.getSingleStation);
router.post("/create", isAdmin(), StationControllers.createStation);
router.patch("/update/:stationId", isAdmin(), StationControllers.updateStation);

export const StationRoutes = router;
