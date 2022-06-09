import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';
import { loginRequestMethod } from '../../util/request-methods/auth-request-methods';
import { createUserRequestMethod } from '../../util/request-methods/user-request-methods';

describe('Tests on the edit user route', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.user.deleteMany();
  });

  it('Should edit user', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const editUserData = {
      username: 'b',
      password: '123456',
    };

    const loginData = {
      username: 'a',
      password: '123456',
    };

    const createUserResponse = await createUserRequestMethod(userData);

    const loginDataResponse = await loginRequestMethod(loginData);

    const accessToken = loginDataResponse.body.accessToken;

    const response = await request(app)
      .put(`/user/${createUserResponse.body.id}`)
      .auth(accessToken, { type: 'bearer' })
      .send(editUserData);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(createUserResponse.body.id);

    await prismaClient.user.deleteMany();
  });

  it('Should return error message', async () => {
    const userData1 = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const userData2 = {
      username: 'b',
      email: 'b@gmail.com',
      password: '123456',
    };

    const editUserData = {
      username: 'b',
      password: '123456',
    };

    const loginData = {
      username: 'a',
      password: '123456',
    };

    const createUserResponse = await createUserRequestMethod(userData1);

    const loginDataResponse = await loginRequestMethod(loginData);

    const accessToken = loginDataResponse.body.accessToken;

    await createUserRequestMethod(userData2);

    const response = await request(app)
      .put(`/user/${createUserResponse.body.id}`)
      .auth(accessToken, { type: 'bearer' })
      .send(editUserData);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual('This username already exists');

    await prismaClient.user.deleteMany();
  });
});
