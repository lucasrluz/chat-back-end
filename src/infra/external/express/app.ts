import express from 'express';
import { authRouter } from './routes/auth-route';
import { roomParticipantsRouter } from './routes/room-participants-route';
import { roomRouter } from './routes/room-route';
import { userRouter } from './routes/user-route';

export const app = express();

app.use(express.json());
app.use(userRouter);
app.use(roomRouter);
app.use(roomParticipantsRouter);
app.use(authRouter);
