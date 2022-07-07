import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../../src/infra/external/express/app';
import {
  RoomWithEmptyName,
  RoomWithInvalidNameType,
  ValidRoom,
} from '../../../util/data/room-data';
import { ValidUser } from '../../../util/data/user-data';
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
    const userData = new ValidUser();

    const loginData = {
      username: userData.username,
      password: userData.password,
    };

    const roomData = new ValidRoom();

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

  it('Should return error message', async () => {
    const userData = new ValidUser();
    const loginData = {
      username: userData.username,
      password: userData.password,
    };
    const roomData = new RoomWithEmptyName();

    const createUserResponse = await createUserRequestMethod(userData);

    const loginDataResponse = await loginRequestMethod(loginData);

    const accessToken = loginDataResponse.body.accessToken;

    const createRoomResponse = await request(app)
      .post(`/room/${createUserResponse.body.id}`)
      .send(roomData)
      .auth(accessToken, { type: 'bearer' });

    expect(createRoomResponse.status).toEqual(400);
    expect(createRoomResponse.body).toEqual('Name should not be empty');

    await prismaClient.user.deleteMany();
  });

  it('Should return error message', async () => {
    const userData = new ValidUser();
    const loginData = {
      username: userData.username,
      password: userData.password,
    };
    const roomData = new RoomWithInvalidNameType();

    const createUserResponse = await createUserRequestMethod(userData);

    const loginDataResponse = await loginRequestMethod(loginData);

    const accessToken = loginDataResponse.body.accessToken;

    const createRoomResponse = await request(app)
      .post(`/room/${createUserResponse.body.id}`)
      .send(roomData)
      .auth(accessToken, { type: 'bearer' });

    expect(createRoomResponse.status).toEqual(400);
    expect(createRoomResponse.body).toEqual('Name must be a string');

    await prismaClient.user.deleteMany();
  });
});
