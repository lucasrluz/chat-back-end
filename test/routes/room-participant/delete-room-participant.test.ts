import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';
import { loginRequestMethod } from '../../util/request-methods/auth-request-methods';
import { createRoomParticipantRequestMethod } from '../../util/request-methods/room-participant-request-method';
import { createRoomRequestMethod } from '../../util/request-methods/room-request-methods';
import { createUserRequestMethod } from '../../util/request-methods/user-request-methods';

describe('Tests on the delete room participant route', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should delete room participant', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const loginData = {
      username: 'a',
      password: '123456',
    };

    const roomData = {
      name: 'a',
    };

    const createUserResponse = await createUserRequestMethod(userData);
    const loginResponse = await loginRequestMethod(loginData);
    const accessToken = loginResponse.body.accessToken;
    const createRoomResponse = await createRoomRequestMethod(
      createUserResponse.body.id,
      roomData,
      accessToken,
    );

    const roomParticipantData = {
      roomId: createRoomResponse.body.roomId,
      userId: createUserResponse.body.id,
    };

    await createRoomParticipantRequestMethod(roomParticipantData, accessToken);

    const deleteRoomParticipantResponse = await request(app)
      .delete(
        `/roomParticipant/${roomParticipantData.roomId}/${roomParticipantData.userId}`,
      )
      .auth(accessToken, { type: 'bearer' });

    expect(deleteRoomParticipantResponse.status).toEqual(204);
    expect(deleteRoomParticipantResponse.body).toEqual({});

    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should error message', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const loginData = {
      username: 'a',
      password: '123456',
    };

    const createUserResponse = await createUserRequestMethod(userData);
    const loginResponse = await loginRequestMethod(loginData);
    const accessToken = loginResponse.body.accessToken;

    const roomParticipantData = {
      roomId: 'invalidRoomId',
      userId: createUserResponse.body.id,
    };

    await createRoomParticipantRequestMethod(roomParticipantData, accessToken);

    const deleteRoomParticipantResponse = await request(app)
      .delete(
        `/roomParticipant/${roomParticipantData.roomId}/${roomParticipantData.userId}`,
      )
      .auth(accessToken, { type: 'bearer' });

    expect(deleteRoomParticipantResponse.status).toEqual(404);
    expect(deleteRoomParticipantResponse.body).toEqual(
      'Room participant not found',
    );

    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });
});
