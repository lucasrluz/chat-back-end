import { Router } from 'express';
import { createUserAdaptRoute } from './adapters/create-user-adapt-route';

export const userRouter = Router();

userRouter.post('/user', createUserAdaptRoute());
