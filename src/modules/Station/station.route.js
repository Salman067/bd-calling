import { Router } from 'express';
import { StationControllers } from './station.controller.js';
import validateAuth from '../../middlewares/validateAuth.js';
import  USER_ROLE from '../User/user.constant.js';

const router = Router();

router.get('/', StationControllers.getAllStations);
router.get('/:stationId', StationControllers.getSingleStation);
router.post(
  '/create',
  // validateAuth(USER_ROLE.admin, USER_ROLE.user),
  StationControllers.createStation,
);
router.patch(
  '/update/:stationId',
  // validateAuth(USER_ROLE.admin, USER_ROLE.user),
  StationControllers.updateStation,
);

export const StationRoutes = router;
