import { Router } from 'express';
import { ensureAuthenticatedUserAdaptRoute } from './adapters/auth/adapt-route-ensure-authenticated-user';
import { createUserAdaptRoute } from './adapters/user/create-user-adapt-route';
import { deleteUserAdaptRoute } from './adapters/user/delete-user-adapt-route';
import { editUserAdaptRoute } from './adapters/user/edit-user-adapt-route';

export const userRouter = Router();

userRouter.post('/user', createUserAdaptRoute());
userRouter.put(
  '/user/:user_id',
  ensureAuthenticatedUserAdaptRoute(),
  editUserAdaptRoute(),
);
userRouter.delete(
  '/user/:user_id',
  ensureAuthenticatedUserAdaptRoute(),
  deleteUserAdaptRoute(),
);
