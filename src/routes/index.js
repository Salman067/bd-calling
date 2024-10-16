import { Router } from 'express';
import {UserRoutes} from '../modules/User/user.route.js';
import{ StationRoutes }from '../modules/Station/station.route.js';
import {TrainRoutes} from '../modules/Train/train.route.js';
import{ WalletRoutes} from '../modules/Wallet/wallet.route.js';
import {TicketRoutes} from '../modules/Ticket/ticket.route.js';

const router = Router();

const routes = [
  { path: '/users', route: UserRoutes },
  { path: '/stations', route: StationRoutes },
  { path: '/trains', route: TrainRoutes },
  { path: '/wallets', route: WalletRoutes },
  { path: '/tickets', route: TicketRoutes },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
