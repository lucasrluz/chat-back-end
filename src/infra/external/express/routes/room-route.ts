import { Router } from 'express';
import { ensureAuthenticatedUserAdaptRoute } from './adapters/auth/adapt-route-ensure-authenticated-user';
import { createRoomAdaptRoute } from './adapters/room/create-room-adapt-route';

export const roomRouter = Router();

roomRouter.post(
  '/room/:user_id',
  ensureAuthenticatedUserAdaptRoute(),
  createRoomAdaptRoute(),
);
