import { createHashPassword } from '../../../src/infra/external/bcrypt/create-hash-password';
import { UserTestsRepository } from '../../util/repository/user-tests-repository';
import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';

describe('Tests on middleware ensure authtenticated user', () => {
  const userTestsRepository = new UserTestsRepository();

  beforeAll(async () => {
    await userTestsRepository.deleteMany();
  });

  it('Should return success message', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: await createHashPassword('123456'),
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

  it('Should return error message', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: await createHashPassword('123456'),
    };

    const createUserResponse = await userTestsRepository.create(userData);

    const accessToken = '';

    const deleteUserResponse = await request(app)
      .delete(`/user/${createUserResponse.userId}`)
      .auth(accessToken, { type: 'bearer' });

    expect(deleteUserResponse.status).toEqual(404);
    expect(deleteUserResponse.body).toEqual('Token not found');

    await userTestsRepository.deleteMany();
  });

  it('Should return error message', async () => {
    const userData1 = {
      username: 'a',
      email: 'a@gmail.com',
      password: await createHashPassword('123456'),
    };

    const createUserResponse1 = await userTestsRepository.create(userData1);

    const accessToken = '';

    const deleteUserResponse = await request(app)
      .delete(`/user/${createUserResponse1.userId}`)
      .auth(accessToken, { type: 'bearer' });

    expect(deleteUserResponse.status).toEqual(404);
    expect(deleteUserResponse.body).toEqual('Token not found');

    await userTestsRepository.deleteMany();
  });
});
