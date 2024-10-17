import { Router } from 'express';
import { WalletControllers } from './wallet.controller.js'; 
import validateAuth from '../../middlewares/validateAuth.js';
import isAdmin from '../../middlewares/isAdmin.js'

const router = Router();

router.get(
  '/',
  validateAuth(),
  WalletControllers.getWallet
);

router.post(
  '/add-funds',
  isAdmin(),
  WalletControllers.addFunds
);

export const WalletRoutes = router;
