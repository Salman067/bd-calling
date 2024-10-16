import { Router } from 'express';
import { WalletControllers } from './wallet.controller.js'; 
import validateAuth from '../../middlewares/validateAuth.js';
import USER_ROLE  from '../User/user.constant.js'; 

const router = Router();

router.get(
  '/',
  // validateAuth(USER_ROLE.admin, USER_ROLE.user),
  WalletControllers.getWallet
);

router.post(
  '/add-funds',
  // validateAuth(USER_ROLE.admin, USER_ROLE.user),
  WalletControllers.addFunds
);

export const WalletRoutes = router;
