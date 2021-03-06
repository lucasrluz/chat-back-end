import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../../src/infra/external/express/app';
import { ValidRoom } from '../../../util/data/room-data';
import { ValidUser } from '../../../util/data/user-data';
import { loginRequestMethod } from '../../../util/request-methods/auth-request-methods';
import { createRoomRequestMethod } from '../../../util/request-methods/room-request-methods';
import { createUserRequestMethod } from '../../../util/request-methods/user-request-methods';

describe('Tests on the create room participants route', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should return new room participant', async () => {
    const userData = new ValidUser();

    const loginData = {
      username: userData.username,
      password: userData.password,
    };

    const roomData = new ValidRoom();

    const createUserResponse = await createUserRequestMethod(userData);
    const loginResponse = await loginRequestMethod(loginData);
    const accessToken = loginResponse.body.accessToken;
    const createRoomResponse = await createRoomRequestMethod(
      createUserResponse.body.id,
      roomData,
      accessToken,
    );

    const createRoomParticipantResponse = await request(app)
      .post(
        `/roomParticipant/${createRoomResponse.body.roomId}/${createUserResponse.body.id}`,
      )
      .auth(accessToken, { type: 'bearer' });

    expect(createRoomParticipantResponse.status).toEqual(201);
    expect(createRoomParticipantResponse.body).toEqual({
      roomId: createRoomParticipantResponse.body.roomId,
      userId: createUserResponse.body.id,
    });

    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should return error', async () => {
    const userData = new ValidUser();

    const loginData = {
      username: userData.username,
      password: userData.password,
    };

    const createUserResponse = await createUserRequestMethod(userData);
    const loginResponse = await loginRequestMethod(loginData);
    const accessToken = loginResponse.body.accessToken;

    const createRoomParticipantResponse = await request(app)
      .post(`/roomParticipant/${'invalidRoomId'}/${createUserResponse.body.id}`)
      .auth(accessToken, { type: 'bearer' });

    expect(createRoomParticipantResponse.status).toEqual(404);
    expect(createRoomParticipantResponse.body).toEqual('Room not found');

    await prismaClient.user.deleteMany();
  });
});
