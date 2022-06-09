import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';

interface RoomData {
  name: string;
}

export async function createRoomRequestMethod(
  userId: string,
  roomData: RoomData,
  accessToken: string,
) {
  return await request(app)
    .post(`/room/${userId}`)
    .send(roomData)
    .auth(accessToken, { type: 'bearer' });
}
