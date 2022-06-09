import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';
import { loginRequestMethod } from '../../util/request-methods/auth-request-methods';
import { createUserRequestMethod } from '../../util/request-methods/user-request-methods';

describe('Tests on the delete user route', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.user.deleteMany();
  });

  it('Should delete user', async () => {
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
});
