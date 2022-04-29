import { Router } from 'express';
import { createUserAdaptRoute } from './adapters/create-user-adapt-route';
import { editUserAdaptRoute } from './adapters/edit-user-adapt-route';

export const userRouter = Router();

userRouter.post('/user', createUserAdaptRoute());
userRouter.put('/user/:user_id', editUserAdaptRoute());
