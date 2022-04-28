import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';

describe('Tests on the create user route', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.user.deleteMany();
  });

  it('Should create new user', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const response = await request(app).post('/user').send(userData);

    expect(response.status).toEqual(201);

    await prismaClient.user.deleteMany();
  });

  describe('Username tests', () => {
    it('Should return error message', async () => {
      const userData = {
        username: '',
        email: 'a@gmail.com',
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username should not be empty');
    });

    it('Should return error message', async () => {
      const userData = {
        username: true,
        email: 'a@gmail.com',
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');
    });

    it('Should return error message', async () => {
      const userData = {
        username: false,
        email: 'a@gmail.com',
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');
    });

    it('Should return error message', async () => {
      const userData = {
        username: undefined,
        email: 'a@gmail.com',
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');
    });

    it('Should return error message', async () => {
      const userData = {
        username: null,
        email: 'a@gmail.com',
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');
    });

    it('Should return error message', async () => {
      const userData = {
        username: 0,
        email: 'a@gmail.com',
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');
    });

    it('Should return error message', async () => {
      const userData = {
        username: { value: 'a' },
        email: 'a@gmail.com',
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Username must be a string');
    });
  });

  describe('Email tests', () => {
    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: '@gmail.com',
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(
        'Email location size must be between 1 and 64 characters',
      );
    });

    it('Should return error message', async () => {
      let local = '';
      while (true) {
        local += 'a';
        if (local.length > 64) break;
      }

      const userData = {
        username: 'a',
        email: local + '@gmail.com',
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(
        'Email location size must be between 1 and 64 characters',
      );
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@',
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(
        'Email domain size must be between 1 and 255 characters',
      );
    });

    it('Should return error message', async () => {
      let domain = '';
      while (true) {
        domain += 'a';
        if (domain.length > 255) break;
      }

      const userData = {
        username: 'a',
        email: 'a@' + domain,
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(
        'Email domain size must be between 1 and 255 characters',
      );
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: '',
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Email must be an email');
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: true,
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Email must be an email');
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: false,
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Email must be an email');
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: undefined,
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Email must be an email');
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: null,
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Email must be an email');
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 0,
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Email must be an email');
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: { value: 'a@gmail.com' },
        password: '123456',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Email must be an email');
    });
  });

  describe('Password tests', () => {
    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(
        'Password length must be longer than 6 characters',
      );
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: true,
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: false,
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: undefined,
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: null,
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: 0,
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');
    });

    it('Should return error message', async () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: { value: '123456' },
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Password must be a string');
    });
  });
});
