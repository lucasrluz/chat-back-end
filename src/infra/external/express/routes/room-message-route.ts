import { Router } from 'express';
import { ensureAuthenticatedUserAdaptRoute } from './adapters/auth/adapt-route-ensure-authenticated-user';
import { createRoomMessageAdaptRoute } from './adapters/room-message/create-room-message-adapt-route';

export const roomMessageRouter = Router();

roomMessageRouter.post(
  '/roomMessage/:user_id/:room_id',
  ensureAuthenticatedUserAdaptRoute(),
  createRoomMessageAdaptRoute(),
);
