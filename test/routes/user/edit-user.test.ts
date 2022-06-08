import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';
import { TestUserRepository } from '../../util/repository/user-tests-repository';

describe('Tests on the edit user route', () => {
  const userTestsRepository = new TestUserRepository();

  beforeAll(async () => {
    await userTestsRepository.deleteMany();
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

    const createUserResponse = await userTestsRepository.create(userData);

    const loginDataResponse = await request(app).post('/login').send(loginData);

    const accessToken = loginDataResponse.body.accessToken;

    const response = await request(app)
      .put(`/user/${createUserResponse.userId}`)
      .auth(accessToken, { type: 'bearer' })
      .send(editUserData);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(createUserResponse.userId);

    await userTestsRepository.deleteMany();
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

    const createUserResponse = await userTestsRepository.create(userData1);

    const loginDataResponse = await request(app).post('/login').send(loginData);

    const accessToken = loginDataResponse.body.accessToken;

    await userTestsRepository.create(userData2);

    const response = await request(app)
      .put(`/user/${createUserResponse.userId}`)
      .auth(accessToken, { type: 'bearer' })
      .send(editUserData);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual('This username already exists');

    await userTestsRepository.deleteMany();
  });
});
