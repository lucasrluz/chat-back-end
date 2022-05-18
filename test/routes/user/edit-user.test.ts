import request from 'supertest';
import { createHashPassword } from '../../../src/infra/external/bcrypt/create-hash-password';
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
      password: await createHashPassword('123456'),
    };

    const editUserData = {
      username: 'b',
      password: await createHashPassword('123456'),
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

  describe('Username tests', () => {
    it('Shold return error message', async () => {
      const userData1 = {
        username: 'a',
        email: 'a@gmail.com',
        password: await createHashPassword('123456'),
      };

      const userData2 = {
        username: 'b',
        email: 'b@gmail.com',
        password: await createHashPassword('123456'),
      };

      const editUserData = {
        username: 'b',
        password: await createHashPassword('123456'),
      };

      const loginData = {
        username: 'a',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData1);

      const loginDataResponse = await request(app)
        .post('/login')
        .send(loginData);

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

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: await createHashPassword('123456'),
      };

      const editUserData = {
        username: '',
        password: await createHashPassword('123456'),
      };

      const loginData = {
        username: 'a',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const loginDataResponse = await request(app)
        .post('/login')
        .send(loginData);

      const accessToken = loginDataResponse.body.accessToken;

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .auth(accessToken, { type: 'bearer' })
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username should not be empty');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: await createHashPassword('123456'),
      };

      const editUserData = {
        username: true,
        password: await createHashPassword('123456'),
      };

      const loginData = {
        username: 'a',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const loginDataResponse = await request(app)
        .post('/login')
        .send(loginData);

      const accessToken = loginDataResponse.body.accessToken;

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .auth(accessToken, { type: 'bearer' })
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: await createHashPassword('123456'),
      };

      const editUserData = {
        username: false,
        password: await createHashPassword('123456'),
      };

      const loginData = {
        username: 'a',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const loginDataResponse = await request(app)
        .post('/login')
        .send(loginData);

      const accessToken = loginDataResponse.body.accessToken;

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .auth(accessToken, { type: 'bearer' })
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: await createHashPassword('123456'),
      };

      const editUserData = {
        username: undefined,
        password: await createHashPassword('123456'),
      };

      const loginData = {
        username: 'a',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const loginDataResponse = await request(app)
        .post('/login')
        .send(loginData);

      const accessToken = loginDataResponse.body.accessToken;

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .auth(accessToken, { type: 'bearer' })
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: await createHashPassword('123456'),
      };

      const editUserData = {
        username: null,
        password: await createHashPassword('123456'),
      };

      const loginData = {
        username: 'a',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const loginDataResponse = await request(app)
        .post('/login')
        .send(loginData);

      const accessToken = loginDataResponse.body.accessToken;

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .auth(accessToken, { type: 'bearer' })
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: await createHashPassword('123456'),
      };

      const editUserData = {
        username: 0,
        password: await createHashPassword('123456'),
      };

      const loginData = {
        username: 'a',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const loginDataResponse = await request(app)
        .post('/login')
        .send(loginData);

      const accessToken = loginDataResponse.body.accessToken;

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .auth(accessToken, { type: 'bearer' })
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: await createHashPassword('123456'),
      };

      const editUserData = {
        username: { value: 'b' },
        password: await createHashPassword('123456'),
      };

      const loginData = {
        username: 'a',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const loginDataResponse = await request(app)
        .post('/login')
        .send(loginData);

      const accessToken = loginDataResponse.body.accessToken;

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .auth(accessToken, { type: 'bearer' })
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
        password: await createHashPassword('123456'),
      };

      const editUserData = {
        username: 'b',
        password: '',
      };

      const loginData = {
        username: 'a',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const loginDataResponse = await request(app)
        .post('/login')
        .send(loginData);

      const accessToken = loginDataResponse.body.accessToken;

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .auth(accessToken, { type: 'bearer' })
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
        password: await createHashPassword('123456'),
      };

      const editUserData = {
        username: 'b',
        password: true,
      };

      const loginData = {
        username: 'a',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const loginDataResponse = await request(app)
        .post('/login')
        .send(loginData);

      const accessToken = loginDataResponse.body.accessToken;

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .auth(accessToken, { type: 'bearer' })
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: await createHashPassword('123456'),
      };

      const editUserData = {
        username: 'b',
        password: false,
      };

      const loginData = {
        username: 'a',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const loginDataResponse = await request(app)
        .post('/login')
        .send(loginData);

      const accessToken = loginDataResponse.body.accessToken;

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .auth(accessToken, { type: 'bearer' })
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: await createHashPassword('123456'),
      };

      const editUserData = {
        username: 'b',
        password: undefined,
      };

      const loginData = {
        username: 'a',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const loginDataResponse = await request(app)
        .post('/login')
        .send(loginData);

      const accessToken = loginDataResponse.body.accessToken;

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .auth(accessToken, { type: 'bearer' })
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: await createHashPassword('123456'),
      };

      const editUserData = {
        username: 'b',
        password: null,
      };

      const loginData = {
        username: 'a',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const loginDataResponse = await request(app)
        .post('/login')
        .send(loginData);

      const accessToken = loginDataResponse.body.accessToken;

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .auth(accessToken, { type: 'bearer' })
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: await createHashPassword('123456'),
      };

      const editUserData = {
        username: 'b',
        password: 0,
      };

      const loginData = {
        username: 'a',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const loginDataResponse = await request(app)
        .post('/login')
        .send(loginData);

      const accessToken = loginDataResponse.body.accessToken;

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .auth(accessToken, { type: 'bearer' })
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await userTestsRepository.deleteMany();
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: await createHashPassword('123456'),
      };

      const editUserData = {
        username: 'b',
        password: { value: '123456' },
      };

      const loginData = {
        username: 'a',
        password: '123456',
      };

      const createUserResponse = await userTestsRepository.create(userData);

      const loginDataResponse = await request(app)
        .post('/login')
        .send(loginData);

      const accessToken = loginDataResponse.body.accessToken;

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .auth(accessToken, { type: 'bearer' })
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await userTestsRepository.deleteMany();
    });
  });
});
