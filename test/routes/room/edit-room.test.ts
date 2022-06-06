import request from 'supertest';
import { createHashPassword } from '../../../src/infra/external/bcrypt/create-hash-password';
import { app } from '../../../src/infra/external/express/app';
import { UserTestsRepository } from '../../util/repository/user-tests-repository';

describe('Tests on the edit room route', () => {
  const userTestRepository = new UserTestsRepository();

  beforeAll(async () => {
    await userTestRepository.deleteMany();
  });

  it('Should edit room', async () => {
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

    const editRoomData = {
      name: 'b',
    };

    const createUserResponse = await userTestRepository.create(userData);
    const loginResponse = await request(app).post('/login').send(loginData);
    const accessToken = await loginResponse.body.accessToken;

    const createRoomResponse = await request(app)
      .post(`/room/${createUserResponse.userId}`)
      .send(roomData)
      .auth(accessToken, { type: 'bearer' });

    const editRoomResponse = await request(app)
      .put(
        `/room/${createRoomResponse.body.roomId}/${createUserResponse.userId}`,
      )
      .send(editRoomData)
      .auth(accessToken, { type: 'bearer' });

    expect(editRoomResponse.status).toEqual(200);
    expect(editRoomResponse.body).toEqual(editRoomData);
  });
});