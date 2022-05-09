import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';
import { UserTestsRepository } from '../../util/repository/user-tests-repository';

describe('Tests on the delete user route', () => {
  const userTestsRepository = new UserTestsRepository();

  beforeAll(async () => {
    await userTestsRepository.deleteMany();
  });

  it('Should delete user', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const createUserResponse = await userTestsRepository.create(userData);

    const deleteUserResponse = await request(app).delete(
      `/user/${createUserResponse.userId}`,
    );

    expect(deleteUserResponse.status).toEqual(200);
  });

  it('Should return error message', async () => {
    const deleteUserResponse = await request(app).delete(`/user/${0}`);

    expect(deleteUserResponse.status).toEqual(404);
    expect(deleteUserResponse.body).toEqual('User not found');
  });
});
