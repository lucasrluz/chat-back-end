import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';

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

    const createUserResponse = await prismaClient.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
    });

    const deleteUserResponse = await request(app).delete(
      `/user/${createUserResponse.userId}`,
    );

    expect(deleteUserResponse.status).toEqual(200);
  });

  it('Should return error message', async () => {
    const deleteUserResponse = await request(app).delete(`/user/${0}`);

    expect(deleteUserResponse.status).toEqual(404);
    expect(deleteUserResponse.body).toEqual('User not found');
  });
});
