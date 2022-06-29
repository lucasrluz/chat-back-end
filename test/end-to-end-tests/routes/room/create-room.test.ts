import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../../src/infra/external/express/app';
import { loginRequestMethod } from '../../../util/request-methods/auth-request-methods';
import { createUserRequestMethod } from '../../../util/request-methods/user-request-methods';

describe('Tests on the create room route', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should return new room', async () => {
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

    const loginDataResponse = await loginRequestMethod(loginData);

    const accessToken = loginDataResponse.body.accessToken;

    const createRoomResponse = await request(app)
      .post(`/room/${createUserResponse.body.id}`)
      .send(roomData)
      .auth(accessToken, { type: 'bearer' });

    expect(createRoomResponse.status).toEqual(201);

    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });
});
