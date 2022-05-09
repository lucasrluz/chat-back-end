import request from 'supertest';
import { createHashPassword } from '../../../src/infra/external/bcrypt/create-hash-password';
import { app } from '../../../src/infra/external/express/app';
import { refreshtokens } from '../../../src/use-case/auth/util/refresh-tokens';
import { sleep } from '../../util/function/sleep';
import { UserTestsRepository } from '../../util/repository/user-tests-repository';

jest.setTimeout(65000);

describe('Tests on create new access token route', () => {
  const userTestsRepository = new UserTestsRepository();

  beforeAll(async () => {
    await userTestsRepository.deleteMany();
  });

  it('Should return new access token and new refresh token', async () => {
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
    const createNewAccessTokenResponse = await request(app)
      .post(`/token/${createUserResponse.userId}`)
      .send({ refreshToken: loginDataResponse.body.refreshToken });

    expect(createNewAccessTokenResponse.status).toEqual(201);

    await userTestsRepository.deleteMany();
    refreshtokens.splice(0, refreshtokens.length);
  });

  it('Should return error message', async () => {
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
    const createNewAccessTokenResponse = await request(app)
      .post(`/token/${createUserResponse.userId}`)
      .send({ refreshToken: loginDataResponse.body.accessToken });

    expect(createNewAccessTokenResponse.status).toEqual(400);
    expect(createNewAccessTokenResponse.body).toEqual('Token invalid');

    await userTestsRepository.deleteMany();
    refreshtokens.splice(0, refreshtokens.length);
  });

  it.skip('Should return error message', async () => {
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

    await sleep(60000);

    const createNewAccessTokenResponse = await request(app)
      .post(`/token/${createUserResponse.userId}`)
      .send({ refreshToken: loginDataResponse.body.refreshToken });

    expect(createNewAccessTokenResponse.status).toEqual(400);

    await userTestsRepository.deleteMany();
    refreshtokens.splice(0, refreshtokens.length);
  });
});
