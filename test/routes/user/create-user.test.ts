import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';
import { TestUserRepository } from '../../util/repository/user-tests-repository';

describe('Tests on the create user route', () => {
  const userTestsRepository = new TestUserRepository();

  beforeAll(async () => {
    await userTestsRepository.deleteMany();
  });

  it('Should create new user', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const response = await request(app).post('/user').send(userData);

    expect(response.status).toEqual(201);

    await userTestsRepository.deleteMany();
  });

  it('Should return status code 400', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    await userTestsRepository.create(userData);

    const response = await request(app).post('/user').send(userData);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual('This username already exists');

    await userTestsRepository.deleteMany();
  });
});
