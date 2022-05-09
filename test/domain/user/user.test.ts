/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../../src/domain/user/user';

describe('User domain tests', () => {
  it('Should return new user', () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const userOrError = User.create(
      userData.username,
      userData.email,
      userData.password,
    );

    expect(userOrError.isSuccess()).toEqual(true);
    expect(userData).toEqual(userOrError.value);
  });

  describe('Username tests', () => {
    it('Should return error message for creating username', () => {
      const userData = {
        username: '',
        email: 'a@gmail.com',
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Username should not be empty');
    });

    it('Should return error message for creating username', () => {
      const username: any = true;

      const userData = {
        username: username,
        email: 'a@gmail.com',
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Username must be a string');
    });

    it('Should return error message for creating username', () => {
      const username: any = false;

      const userData = {
        username: username,
        email: 'a@gmail.com',
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Username must be a string');
    });

    it('Should return error message for creating username', () => {
      const username: any = undefined;

      const userData = {
        username: username,
        email: 'a@gmail.com',
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Username must be a string');
    });

    it('Should return error message for creating username', () => {
      const username: any = null;

      const userData = {
        username: username,
        email: 'a@gmail.com',
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Username must be a string');
    });

    it('Should return error message for creating username', () => {
      const username: any = 0;

      const userData = {
        username: username,
        email: 'a@gmail.com',
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Username must be a string');
    });

    it('Should return error message for creating username', () => {
      const username: any = {
        value: 'a',
      };

      const userData = {
        username: username,
        email: 'a@gmail.com',
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Username must be a string');
    });
  });

  describe('Email tests', () => {
    it('Should return error message for creating email', () => {
      const userData = {
        username: 'a',
        email: '@gmail.com',
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual(
        'Email location size must be between 1 and 64 characters',
      );
    });

    it('Should return error message for creating email', () => {
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

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual(
        'Email location size must be between 1 and 64 characters',
      );
    });

    it('Should return error message for creating email', () => {
      const userData = {
        username: 'a',
        email: 'a@',
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual(
        'Email domain size must be between 1 and 255 characters',
      );
    });

    it('Should return error message for creating email', () => {
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

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual(
        'Email domain size must be between 1 and 255 characters',
      );
    });

    it('Should return error message for creating email', () => {
      const userData = {
        username: 'a',
        email: '',
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Email must be an email');
    });

    it('Should return error message for creating email', () => {
      const email: any = true;
      const userData = {
        username: 'a',
        email: email,
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Email must be an email');
    });

    it('Should return error message for creating email', () => {
      const email: any = false;
      const userData = {
        username: 'a',
        email: email,
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Email must be an email');
    });

    it('Should return error message for creating email', () => {
      const email: any = undefined;
      const userData = {
        username: 'a',
        email: email,
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Email must be an email');
    });

    it('Should return error message for creating email', () => {
      const email: any = null;
      const userData = {
        username: 'a',
        email: email,
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Email must be an email');
    });

    it('Should return error message for creating email', () => {
      const email: any = 0;
      const userData = {
        username: 'a',
        email: email,
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Email must be an email');
    });

    it('Should return error message for creating email', () => {
      const email: any = { value: 'a@gmail.com' };

      const userData = {
        username: 'a',
        email: email,
        password: '123456',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Email must be an email');
    });
  });

  describe('Password tests', () => {
    it('Should return error message for creating password', () => {
      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: '12345',
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual(
        'Password length must be longer than 6 characters',
      );
    });

    it('Should return error message for creating password', () => {
      const password: any = true;

      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: password,
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Password must be a string');
    });

    it('Should return error message for creating password', () => {
      const password: any = false;

      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: password,
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Password must be a string');
    });

    it('Should return error message for creating password', () => {
      const password: any = undefined;

      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: password,
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Password must be a string');
    });

    it('Should return error message for creating password', () => {
      const password: any = null;

      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: password,
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Password must be a string');
    });

    it('Should return error message for creating password', () => {
      const password: any = 0;

      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: password,
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Password must be a string');
    });

    it('Should return error message for creating password', () => {
      const password: any = { value: '123456' };

      const userData = {
        username: 'a',
        email: 'a@gmail.com',
        password: password,
      };

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Password must be a string');
    });
  });
});
