import express from 'express';
import { userRouter } from './user-route';

export const app = express();

app.use(express.json());
app.use(userRouter);
