import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../../src/infra/external/express/app';
import { ValidUser } from '../../../util/data/user-data';
import { createUserRequestMethod } from '../../../util/request-methods/user-request-methods';

describe('Tests on the create user route', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should create new user', async () => {
    const userData = new ValidUser();

    const response = await request(app).post('/user').send(userData);

    expect(response.status).toEqual(201);

    await prismaClient.user.deleteMany();
  });

  it('Should return status code 400', async () => {
    const userData = new ValidUser();

    await createUserRequestMethod(userData);

    const response = await request(app).post('/user').send(userData);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual('This username already exists');

    await prismaClient.user.deleteMany();
  });
});
