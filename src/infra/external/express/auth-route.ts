import { Router } from 'express';
import { adaptRouteLogin } from './adapters/auth/adapt-route-login';

export const authRouter = Router();

authRouter.post('/login', adaptRouteLogin());
