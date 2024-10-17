import { Router } from 'express';
import { TrainScheduleControllers } from './train.schedule.controller.js'; 
import validateAuth from '../../middlewares/validateAuth.js';
import USER_ROLE  from '../User/user.constant.js'; 

const router = Router();

router.get(
  '/',
  // validateAuth(USER_ROLE.admin, USER_ROLE.user),
  TrainScheduleControllers.getTrainSchedule
);

router.get(
    '/:trainCode',
    // validateAuth(USER_ROLE.admin, USER_ROLE.user),
    TrainScheduleControllers.getSingleTrainSchedule
  );
  

router.post(
  '/create',
  // validateAuth(USER_ROLE.admin, USER_ROLE.user),
  TrainScheduleControllers.addTrainSchedule
);

router.patch(
    '/update/:scheduleId',
    // validateAuth(USER_ROLE.admin, USER_ROLE.user),
    TrainScheduleControllers.updateTrainSchedule
)

export const ScheduleRout = router;
