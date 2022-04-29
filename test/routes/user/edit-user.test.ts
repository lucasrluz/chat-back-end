import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';

describe('Tests on the edit user route', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.user.deleteMany();
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

    const createUserResponse = await prismaClient.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
    });

    const response = await request(app)
      .put(`/user/${createUserResponse.userId}`)
      .send(editUserData);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(createUserResponse.userId);

    await prismaClient.user.deleteMany();
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

      const createUserResponse = await prismaClient.user.create({
        data: {
          username: userData1.username,
          email: userData1.email,
          password: userData1.password,
        },
      });

      await prismaClient.user.create({
        data: {
          username: userData2.username,
          email: userData2.email,
          password: userData2.password,
        },
      });

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('This username already exists');

      await prismaClient.user.deleteMany();
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

      const createUserResponse = await prismaClient.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username should not be empty');

      await prismaClient.user.deleteMany();
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

      const createUserResponse = await prismaClient.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await prismaClient.user.deleteMany();
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

      const createUserResponse = await prismaClient.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await prismaClient.user.deleteMany();
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

      const createUserResponse = await prismaClient.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await prismaClient.user.deleteMany();
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

      const createUserResponse = await prismaClient.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await prismaClient.user.deleteMany();
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

      const createUserResponse = await prismaClient.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await prismaClient.user.deleteMany();
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

      const createUserResponse = await prismaClient.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');

      await prismaClient.user.deleteMany();
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

      const createUserResponse = await prismaClient.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(
        'Password length must be longer than 6 characters',
      );

      await prismaClient.user.deleteMany();
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

      const createUserResponse = await prismaClient.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await prismaClient.user.deleteMany();
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

      const createUserResponse = await prismaClient.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await prismaClient.user.deleteMany();
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

      const createUserResponse = await prismaClient.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await prismaClient.user.deleteMany();
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

      const createUserResponse = await prismaClient.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await prismaClient.user.deleteMany();
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

      const createUserResponse = await prismaClient.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await prismaClient.user.deleteMany();
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

      const createUserResponse = await prismaClient.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      const response = await request(app)
        .put(`/user/${createUserResponse.userId}`)
        .send(editUserData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');

      await prismaClient.user.deleteMany();
    });
  });
});
