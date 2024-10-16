import { Router } from 'express';
import { UserControllers } from './user.controller.js';

const router = Router();

router.post('/register', UserControllers.registerUser);
router.post('/login', UserControllers.loginUser);

router.get('/list', UserControllers.getAllUser);

export const UserRoutes = router; 
