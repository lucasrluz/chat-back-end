import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../../src/infra/external/express/app';
import { ValidUser } from '../../../util/data/user-data';
import { loginRequestMethod } from '../../../util/request-methods/auth-request-methods';
import { createUserRequestMethod } from '../../../util/request-methods/user-request-methods';

describe('Tests on the edit user route', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should edit user', async () => {
    const userData = new ValidUser();

    const editUserData = new ValidUser();
    editUserData.username = 'b';

    const loginData = {
      username: userData.username,
      password: userData.password,
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

  it('Should edit user', async () => {
    const userData = new ValidUser();

    const editUserData = new ValidUser();
    editUserData.password = '654321';

    const loginData = {
      username: userData.username,
      password: userData.password,
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
    const userData1 = new ValidUser();

    const userData2 = new ValidUser();
    userData2.username = 'b';
    userData2.email = 'b@gmail.com';

    const editUserData = {
      username: 'b',
      password: userData1.password,
    };

    const loginData = {
      username: userData1.username,
      password: userData1.password,
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
