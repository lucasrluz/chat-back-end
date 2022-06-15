import { Router } from 'express';
import { ensureAuthenticatedUserAdaptRoute } from './adapters/auth/adapt-route-ensure-authenticated-user';
import { createRoomParticipantAdaptRoute } from './adapters/room-participant/create-room-participant-adapt-route';
import { deleteRoomParticipantAdaptRoute } from './adapters/room-participant/delete-room-participant-adapt-route';

export const roomParticipantRouter = Router();

roomParticipantRouter.post(
  `/roomParticipant/:room_id/:user_id`,
  ensureAuthenticatedUserAdaptRoute(),
  createRoomParticipantAdaptRoute(),
);

roomParticipantRouter.delete(
  '/roomParticipant/:room_id/:user_id',
  ensureAuthenticatedUserAdaptRoute(),
  deleteRoomParticipantAdaptRoute(),
);
