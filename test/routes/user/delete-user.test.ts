import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';
import { TestUserRepository } from '../../util/repository/user-tests-repository';

describe('Tests on the delete user route', () => {
  const userTestsRepository = new TestUserRepository();

  beforeAll(async () => {
    await userTestsRepository.deleteMany();
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

    const createUserResponse = await userTestsRepository.create(userData);

    const loginDataResponse = await request(app).post('/login').send(loginData);

    const accessToken = loginDataResponse.body.accessToken;

    const deleteUserResponse = await request(app)
      .delete(`/user/${createUserResponse.userId}`)
      .auth(accessToken, { type: 'bearer' });

    expect(deleteUserResponse.status).toEqual(200);
  });
});
