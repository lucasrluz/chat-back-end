import { Router } from 'express';
import { ensureAuthenticatedUserAdaptRoute } from './adapters/auth/adapt-route-ensure-authenticated-user';
import { createRoomParticipantsAdaptRoute } from './adapters/room-participants/create-room-participants-adapt-route';

export const roomParticipantsRouter = Router();

roomParticipantsRouter.post(
  `/roomParticipants/:room_id/:user_id`,
  ensureAuthenticatedUserAdaptRoute(),
  createRoomParticipantsAdaptRoute(),
);
