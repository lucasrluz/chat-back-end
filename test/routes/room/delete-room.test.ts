import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';
import { loginRequestMethod } from '../../util/request-methods/auth-request-methods';
import { createRoomRequestMethod } from '../../util/request-methods/room-request-methods';
import { createUserRequestMethod } from '../../util/request-methods/user-request-methods';

describe('Tests on the delete room route ', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.user.deleteMany();
  });

  it('Should delete room', async () => {
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

    const deleteRoomResponse = await request(app)
      .delete(
        `/room/${createRoomResponse.body.roomId}/${createUserResponse.body.id}`,
      )
      .auth(accessToken, { type: 'bearer' });

    expect(deleteRoomResponse.status).toEqual(200);

    await prismaClient.user.deleteMany();
  });

  it('Should return error message', async () => {
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

    const deleteRoomResponse = await request(app)
      .delete(`/room/'invalidRoomId'/${createUserResponse.body.id}`)
      .auth(accessToken, { type: 'bearer' });

    expect(deleteRoomResponse.status).toEqual(404);
    expect(deleteRoomResponse.body).toEqual('Room not found');
  });
});
