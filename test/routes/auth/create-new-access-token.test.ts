import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';
import { refreshtokens } from '../../../src/use-case/auth/util/refresh-tokens';
import { sleep } from '../../util/function/sleep';
import { loginRequestMethod } from '../../util/request-methods/auth-request-methods';
import { createUserRequestMethod } from '../../util/request-methods/user-request-methods';

jest.setTimeout(65000);

describe('Tests on create new access token route', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.user.deleteMany();
  });

  it('Should return new access token and new refresh token', async () => {
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

    const loginDataResponse = await request(app).post('/login').send(loginData);
    const createNewAccessTokenResponse = await request(app)
      .post(`/token/${createUserResponse.body.id}`)
      .send({ refreshToken: loginDataResponse.body.refreshToken });

    expect(createNewAccessTokenResponse.status).toEqual(201);

    await prismaClient.user.deleteMany();
    refreshtokens.splice(0, refreshtokens.length);
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

    const loginDataResponse = await loginRequestMethod(loginData);

    const createNewAccessTokenResponse = await request(app)
      .post(`/token/${createUserResponse.body.id}`)
      .send({ refreshToken: loginDataResponse.body.accessToken });

    expect(createNewAccessTokenResponse.status).toEqual(400);
    expect(createNewAccessTokenResponse.body).toEqual('Token invalid');

    await prismaClient.user.deleteMany();
    refreshtokens.splice(0, refreshtokens.length);
  });

  it.skip('Should return error message', async () => {
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

    const loginDataResponse = await request(app).post('/login').send(loginData);

    await sleep(60000);

    const createNewAccessTokenResponse = await request(app)
      .post(`/token/${createUserResponse.body.id}`)
      .send({ refreshToken: loginDataResponse.body.refreshToken });

    expect(createNewAccessTokenResponse.status).toEqual(400);

    await prismaClient.user.deleteMany();
    refreshtokens.splice(0, refreshtokens.length);
  });
});
