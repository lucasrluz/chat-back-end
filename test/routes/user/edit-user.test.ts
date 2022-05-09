import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';
import { UserTestsRepository } from '../../util/repository/user-tests-repository';

describe('Tests on the edit user route', () => {
  const userTestsRepository = new UserTestsRepository();

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

    const createUserResponse = await userTestsRepository.create(userData);

    const response = await request(app)
      .put(`/user/${createUserResponse.userId}`)
      .send(editUserData);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(createUserResponse.userId);

    await userTestsRepository.deleteMany();
  });

  describe('Username tests', () => {
    it('Should return error message', async () => {
      const editUserData = {
        username: 'b',
        password: '123456',
      };

      const response = await request(app).put(`/user/${0}`).send(editUserData);

      expect(response.status).toEqual(404);
      expect(response.body).toEqual('User not found');
    });

    it('Shold return error message', async () => {
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

      const createUserResponse = await userTestsRepository.create(userData1);

      await userTestsRepository.create(userData2);

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('This username already exists');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '123456',
      };

      const editUserData = {
        username: '',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username should not be empty');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '123456',
      };

      const editUserData = {
        username: true,
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '123456',
      };

      const editUserData = {
        username: false,
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '123456',
      };

      const editUserData = {
        username: undefined,
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '123456',
      };

      const editUserData = {
        username: null,
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '123456',
      };

      const editUserData = {
        username: 0,
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '123456',
      };

      const editUserData = {
        username: { value: 'b' },
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await userTestsRepository.deleteMany();
    });
  });

  describe('Password tests', () => {
    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '123456',
      };

      const editUserData = {
        username: 'b',
        password: '',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(
        'Password length must be longer than 6 characters',
      );

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '123456',
      };

      const editUserData = {
        username: 'b',
        password: true,
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '123456',
      };

      const editUserData = {
        username: 'b',
        password: false,
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '123456',
      };

      const editUserData = {
        username: 'b',
        password: undefined,
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '123456',
      };

      const editUserData = {
        username: 'b',
        password: null,
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '123456',
      };

      const editUserData = {
        username: 'b',
        password: 0,
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '123456',
      };

      const editUserData = {
        username: 'b',
        password: { value: '123456' },
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await userTestsRepository.deleteMany();
    });
  });
});
