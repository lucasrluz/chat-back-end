import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../../src/infra/external/express/app';
import { ValidUser } from '../../../util/data/user-data';
import { loginRequestMethod } from '../../../util/request-methods/auth-request-methods';
import { createUserRequestMethod } from '../../../util/request-methods/user-request-methods';

describe('Tests on middleware ensure authtenticated user', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should return success message', async () => {
    const userData = new ValidUser();

    const loginData = {
      username: userData.username,
      password: userData.password,
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
    const userData = new ValidUser();

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
    const userData1 = new ValidUser();

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
