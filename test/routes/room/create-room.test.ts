import request from 'supertest';
import { createHashPassword } from '../../../src/infra/external/bcrypt/create-hash-password';
import { app } from '../../../src/infra/external/express/app';
import { UserTestsRepository } from '../../util/repository/user-tests-repository';

describe('Tests on the create room route', () => {
  const userTestsRepository = new UserTestsRepository();

  beforeAll(async () => {
    await userTestsRepository.deleteMany();
  });

  it('Should return new room', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: await createHashPassword('123456'),
    };

    const loginData = {
      username: 'a',
      password: '123456',
    };

    const roomData = {
      name: 'a',
    };

    const createUserResponse = await userTestsRepository.create(userData);

    const loginDataResponse = await request(app).post('/login').send(loginData);

    const accessToken = loginDataResponse.body.accessToken;

    const createRoomResponse = await request(app)
      .post(`/room/${createUserResponse.userId}`)
      .send(roomData)
      .auth(accessToken, { type: 'bearer' });

    expect(createRoomResponse.status).toEqual(201);
  });
});
