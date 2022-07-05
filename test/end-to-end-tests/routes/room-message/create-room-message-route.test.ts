import { PrismaClient } from '@prisma/client';
import { createRoomRequestMethod } from '../../../util/request-methods/room-request-methods';
import { createUserRequestMethod } from '../../../util/request-methods/user-request-methods';
import request from 'supertest';
import { app } from '../../../../src/infra/external/express/app';
import { loginRequestMethod } from '../../../util/request-methods/auth-request-methods';

describe('Create room message route tests', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.roomMessage.deleteMany();
    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should create room message', async () => {
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

    const roomMessageData = {
      content: 'a',
    };

    const createUserResponse = await createUserRequestMethod(userData);
    const loginResponse = await loginRequestMethod(loginData);
    const accessToken = await loginResponse.body.accessToken;
    const createRoomResponse = await createRoomRequestMethod(
      createUserResponse.body.id,
      roomData,
      accessToken,
    );

    const createRoomMessageResponse = await request(app)
      .post(
        `/roomMessage/${createUserResponse.body.id}/${createRoomResponse.body.roomId}`,
      )
      .auth(accessToken, { type: 'bearer' })
      .send(roomMessageData);

    expect(createRoomMessageResponse.status).toEqual(201);

    await prismaClient.roomMessage.deleteMany();
    await prismaClient.room.deleteMany();
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

    const roomData = {
      name: 'a',
    };

    const roomMessageData = {
      content: '',
    };

    const createUserResponse = await createUserRequestMethod(userData);
    const loginResponse = await loginRequestMethod(loginData);
    const accessToken = await loginResponse.body.accessToken;
    const createRoomResponse = await createRoomRequestMethod(
      createUserResponse.body.id,
      roomData,
      accessToken,
    );

    const createRoomMessageResponse = await request(app)
      .post(
        `/roomMessage/${createUserResponse.body.id}/${createRoomResponse.body.roomId}`,
      )
      .auth(accessToken, { type: 'bearer' })
      .send(roomMessageData);

    expect(createRoomMessageResponse.status).toEqual(400);
    expect(createRoomMessageResponse.body).toEqual(
      'Content should not be empty',
    );

    await prismaClient.roomMessage.deleteMany();
    await prismaClient.room.deleteMany();
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

    const roomMessageData = {
      content: 'a',
    };

    const createUserResponse = await createUserRequestMethod(userData);
    const loginResponse = await loginRequestMethod(loginData);
    const accessToken = await loginResponse.body.accessToken;

    const createRoomMessageResponse = await request(app)
      .post(`/roomMessage/${createUserResponse.body.id}/${'invalidRoomId'}`)
      .auth(accessToken, { type: 'bearer' })
      .send(roomMessageData);

    expect(createRoomMessageResponse.status).toEqual(404);
    expect(createRoomMessageResponse.body).toEqual('Room not found');

    await prismaClient.roomMessage.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });
});
