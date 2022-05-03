import express from 'express';
import { authRouter } from './auth-route';
import { userRouter } from './user-route';

export const app = express();

app.use(express.json());
app.use(userRouter);
app.use(authRouter);
