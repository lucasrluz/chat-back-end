import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../../src/infra/external/express/app';
import { ValidUser } from '../../../util/data/user-data';
import { createUserRequestMethod } from '../../../util/request-methods/user-request-methods';

describe('Tests on login route', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should return access token and refersh token', async () => {
    const userData = new ValidUser();

    const loginData = {
      username: userData.username,
      password: userData.password,
    };

    await createUserRequestMethod(userData);

    const response = await request(app).post('/login').send(loginData);

    expect(response.status).toEqual(200);

    await prismaClient.user.deleteMany();
  });

  it('Should return error message', async () => {
    const userData = new ValidUser();

    const loginData = {
      username: userData.username,
      password: userData.password,
    };

    const response = await request(app).post('/login').send(loginData);

    expect(response.status).toEqual(401);
    expect(response.body).toEqual('Username or password invalid');
  });

  it('Should return error message', async () => {
    const userData = new ValidUser();

    const loginData = {
      username: userData.username,
      password: '654321',
    };

    await createUserRequestMethod(userData);

    const response = await request(app).post('/login').send(loginData);

    expect(response.status).toEqual(401);
    expect(response.body).toEqual('Username or password invalid');

    await prismaClient.user.deleteMany();
  });
});
