import { Router } from 'express';
import { ensureAuthenticatedUserAdaptRoute } from './adapters/auth/adapt-route-ensure-authenticated-user';
import { createRoomAdaptRoute } from './adapters/room/create-room-adapt-route';
import { deleteRoomAdaptRoute } from './adapters/room/delete-room-adapt-route';
import { editRoomAdaptRoute } from './adapters/room/edit-room-adapt-route';

export const roomRouter = Router();

roomRouter.post(
  '/room/:user_id',
  ensureAuthenticatedUserAdaptRoute(),
  createRoomAdaptRoute(),
);

roomRouter.put(
  '/room/:room_id/:user_id',
  ensureAuthenticatedUserAdaptRoute(),
  editRoomAdaptRoute(),
);

roomRouter.delete(
  '/room/:room_id/:user_id',
  ensureAuthenticatedUserAdaptRoute(),
  deleteRoomAdaptRoute(),
);
