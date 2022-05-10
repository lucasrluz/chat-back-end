import { Router } from 'express';
import { adaptRouteCreateNewAccessToken } from './adapters/auth/adapt-route-create-new-access-token';
import { adaptRouteLogin } from './adapters/auth/adapt-route-login';

export const authRouter = Router();

authRouter.post('/login', adaptRouteLogin());
authRouter.post('/token/:user_id', adaptRouteCreateNewAccessToken());
