import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';

describe('Tests on the create room participants route', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.roomParticipants.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should return new room participant', async () => {
    const userData = {
      username: 'a',
      email: 'a@gamil.com',
      password: '123456',
    };

    const loginData = {
      username: 'a',
      password: '123456',
    };

    const roomData = {
      name: 'a',
    };

    const createUserResponse = await request(app).post('/user').send(userData);
    const loginResponse = await request(app).post('/login').send(loginData);
    const accessToken = loginResponse.body.accessToken;
    const createRoomResponse = await request(app)
      .post(`/room/${createUserResponse.body.id}`)
      .send(roomData)
      .auth(accessToken, { type: 'bearer' });

    const createRoomParticipantResponse = await request(app)
      .post(
        `/roomParticipants/${createRoomResponse.body.roomId}/${createUserResponse.body.id}`,
      )
      .auth(accessToken, { type: 'bearer' });

    expect(createRoomParticipantResponse.status).toEqual(201);
    expect(createRoomParticipantResponse.body).toEqual({
      roomId: createRoomParticipantResponse.body.roomId,
      userId: createUserResponse.body.id,
    });

    await prismaClient.roomParticipants.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });
});
