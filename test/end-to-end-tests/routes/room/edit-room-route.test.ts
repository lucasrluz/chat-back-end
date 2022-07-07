import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../../src/infra/external/express/app';
import { ValidRoom } from '../../../util/data/room-data';
import { ValidUser } from '../../../util/data/user-data';
import { loginRequestMethod } from '../../../util/request-methods/auth-request-methods';
import { createRoomRequestMethod } from '../../../util/request-methods/room-request-methods';
import { createUserRequestMethod } from '../../../util/request-methods/user-request-methods';

describe('Tests on the edit room route', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should edit room', async () => {
    const userData = new ValidUser();

    const loginData = {
      username: userData.username,
      password: userData.password,
    };

    const roomData = new ValidRoom();

    const editRoomData = new ValidRoom();
    editRoomData.name = 'b';

    const createUserResponse = await createUserRequestMethod(userData);
    const loginResponse = await loginRequestMethod(loginData);
    const accessToken = await loginResponse.body.accessToken;

    const createRoomResponse = await createRoomRequestMethod(
      createUserResponse.body.id,
      roomData,
      accessToken,
    );

    const editRoomResponse = await request(app)
      .put(
        `/room/${createRoomResponse.body.roomId}/${createUserResponse.body.id}`,
      )
      .send(editRoomData)
      .auth(accessToken, { type: 'bearer' });

    expect(editRoomResponse.status).toEqual(200);
    expect(editRoomResponse.body).toEqual(editRoomData);

    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should return error message', async () => {
    const userData = new ValidUser();

    const loginData = {
      username: userData.username,
      password: userData.password,
    };

    const editRoomData = new ValidRoom();
    editRoomData.name = 'b';

    const createUserResponse = await createUserRequestMethod(userData);
    const loginResponse = await loginRequestMethod(loginData);
    const accessToken = await loginResponse.body.accessToken;

    const editRoomResponse = await request(app)
      .put(`/room/${'invalidRoomId'}/${createUserResponse.body.id}`)
      .send(editRoomData)
      .auth(accessToken, { type: 'bearer' });

    expect(editRoomResponse.status).toEqual(404);
    expect(editRoomResponse.body).toEqual('Room not found');

    await prismaClient.user.deleteMany();
  });
});
