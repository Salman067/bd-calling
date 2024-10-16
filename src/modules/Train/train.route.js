import { Router } from 'express';
import { TrainControllers } from './train.controller.js'; 
import validateAuth from '../../middlewares/validateAuth.js'; 
import USER_ROLE  from '../User/user.constant.js'; 

const router = Router();

router.get('/', TrainControllers.getAllTrains);
router.get('/:trainId', TrainControllers.getSingleTrain);

router.post(
  '/create',
  // validateAuth(USER_ROLE.admin, USER_ROLE.user),
  TrainControllers.createTrain,
);

router.patch(
  '/update/:trainId',
  // validateAuth(USER_ROLE.admin, USER_ROLE.user),
  TrainControllers.updateTrain,
);

export const TrainRoutes = router;
