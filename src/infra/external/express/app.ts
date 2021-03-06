import express from 'express';
import { authRouter } from './routes/auth-route';
import { roomMessageRouter } from './routes/room-message-route';
import { roomParticipantRouter } from './routes/room-participant-route';
import { roomRouter } from './routes/room-route';
import { userRouter } from './routes/user-route';

export const app = express();

app.use(express.json());
app.use(userRouter);
app.use(roomRouter);
app.use(roomMessageRouter);
app.use(roomParticipantRouter);
app.use(authRouter);
