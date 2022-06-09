import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';
import { loginRequestMethod } from '../../util/request-methods/auth-request-methods';
import { createUserRequestMethod } from '../../util/request-methods/user-request-methods';

describe('Tests on middleware ensure authtenticated user', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.user.deleteMany();
  });

  it('Should return success message', async () => {
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

    const accessToken = loginDataResponse.body.accessToken;

    const deleteUserResponse = await request(app)
      .delete(`/user/${createUserResponse.body.id}`)
      .auth(accessToken, { type: 'bearer' });

    expect(deleteUserResponse.status).toEqual(200);
  });

  it('Should return error message', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const createUserResponse = await createUserRequestMethod(userData);

    const accessToken = '';

    const deleteUserResponse = await request(app)
      .delete(`/user/${createUserResponse.body.id}`)
      .auth(accessToken, { type: 'bearer' });

    expect(deleteUserResponse.status).toEqual(404);
    expect(deleteUserResponse.body).toEqual('Token not found');

    await prismaClient.user.deleteMany();
  });

  it('Should return error message', async () => {
    const userData1 = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const createUserResponse1 = await createUserRequestMethod(userData1);

    const accessToken = '';

    const deleteUserResponse = await request(app)
      .delete(`/user/${createUserResponse1.body.id}`)
      .auth(accessToken, { type: 'bearer' });

    expect(deleteUserResponse.status).toEqual(404);
    expect(deleteUserResponse.body).toEqual('Token not found');

    await prismaClient.user.deleteMany();
  });
});
