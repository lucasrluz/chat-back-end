import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { createHashPassword } from '../../../src/infra/external/bcrypt/create-hash-password';
import { app } from '../../../src/infra/external/express/app';

describe('Tests on login route', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.user.deleteMany();
  });

  it('Should return access token and refersh token', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: await createHashPassword('123456'),
    };

    const loginData = {
      username: 'a',
      password: '123456',
    };

    await prismaClient.user.create({ data: userData });

    const response = await request(app).post('/login').send(loginData);

    expect(response.status).toEqual(200);

    await prismaClient.user.deleteMany();
  });

  it('Should return error message', async () => {
    const loginData = {
      username: 'a',
      password: '123456',
    };

    const response = await request(app).post('/login').send(loginData);

    expect(response.status).toEqual(401);
    expect(response.body).toEqual('Username or password invalid');
  });

  it('Should return error message', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: await createHashPassword('123456'),
    };

    const loginData = {
      username: 'a',
      password: '654321',
    };

    await prismaClient.user.create({ data: userData });

    const response = await request(app).post('/login').send(loginData);

    expect(response.status).toEqual(401);
    expect(response.body).toEqual('Username or password invalid');

    await prismaClient.user.deleteMany();
  });
});
