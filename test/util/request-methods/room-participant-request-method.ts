import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';

interface RoomParticipantData {
  roomId: string;
  userId: string;
}

export async function createRoomParticipantRequestMethod(
  roomParticipantData: RoomParticipantData,
  accessToken: string,
) {
  return await request(app)
    .post(
      `/roomParticipant/${roomParticipantData.roomId}/${roomParticipantData.userId}`,
    )
    .auth(accessToken, { type: 'bearer' });
}
