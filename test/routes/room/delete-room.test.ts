import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';
import { TestUserRepository } from '../../util/repository/user-tests-repository';

describe('Tests on the delete room route ', () => {
  const userTestRepository = new TestUserRepository();

  beforeAll(async () => {
    await userTestRepository.deleteMany();
  });

  it('Should delete room', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const loginData = {
      username: 'a',
      password: '123456',
    };

    const roomData = {
      name: 'a',
    };

    const createUserResponse = await userTestRepository.create(userData);

    const loginResponse = await request(app).post('/login').send(loginData);

    const accessToken = loginResponse.body.accessToken;

    const createRoomResponse = await request(app)
      .post(`/room/${createUserResponse.userId}`)
      .send(roomData)
      .auth(accessToken, { type: 'bearer' });

    const deleteRoomResponse = await request(app)
      .delete(
        `/room/${createRoomResponse.body.roomId}/${createUserResponse.userId}`,
      )
      .auth(accessToken, { type: 'bearer' });

    expect(deleteRoomResponse.status).toEqual(200);

    await userTestRepository.deleteMany();
  });

  it('Should return error message', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const loginData = {
      username: 'a',
      password: '123456',
    };

    const createUserResponse = await userTestRepository.create(userData);

    const loginResponse = await request(app).post('/login').send(loginData);

    const accessToken = loginResponse.body.accessToken;

    const deleteRoomResponse = await request(app)
      .delete(`/room/'invalidRoomId'/${createUserResponse.userId}`)
      .auth(accessToken, { type: 'bearer' });

    expect(deleteRoomResponse.status).toEqual(404);
    expect(deleteRoomResponse.body).toEqual('Room not found');
  });
});
