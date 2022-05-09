import request from 'supertest';
import { createHashPassword } from '../../../src/infra/external/bcrypt/create-hash-password';
import { app } from '../../../src/infra/external/express/app';
import { UserTestsRepository } from '../../util/repository/user-tests-repository';

describe('Tests on login route', () => {
  const userTestsRepository = new UserTestsRepository();

  beforeAll(async () => {
    await userTestsRepository.deleteMany();
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

    await userTestsRepository.create(userData);

    const response = await request(app).post('/login').send(loginData);

    expect(response.status).toEqual(200);

    await userTestsRepository.deleteMany();
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

    await userTestsRepository.create(userData);

    const response = await request(app).post('/login').send(loginData);

    expect(response.status).toEqual(401);
    expect(response.body).toEqual('Username or password invalid');

    await userTestsRepository.deleteMany();
  });
});
