import express from 'express';
import { authRouter } from './routes/auth-route';
import { userRouter } from './routes/user-route';

export const app = express();

app.use(express.json());
app.use(userRouter);
app.use(authRouter);
