/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../../../src/domain/user/user';
import {
  UserWithEmptyEmail,
  UserWithEmptyEmailDomain,
  UserWithEmptyEmailLocal,
  UserWithEmptyPassword,
  UserWithEmptyUsername,
  UserWithInvalidEmailType,
  UserWithInvalidPasswordType,
  UserWithInvalidUsernameType,
  UserWithSizeEmailDomainLongerThanAllowed,
  UserWithSizeEmailLocalLongerThanAllowed,
  ValidUser,
} from '../../../util/data/user-data';

describe('User domain tests', () => {
  it('Should return new user', () => {
    const userData = new ValidUser();

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
      const userData = new UserWithEmptyUsername();

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Username should not be empty');
    });

    it('Should return error message for creating username', () => {
      const userData = new UserWithInvalidUsernameType();

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
      const userData = new UserWithEmptyEmailLocal();

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
      const userData = new UserWithSizeEmailLocalLongerThanAllowed();

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
      const userData = new UserWithEmptyEmailDomain();

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
      const userData = new UserWithSizeEmailDomainLongerThanAllowed();

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
      const userData = new UserWithEmptyEmail();

      const userOrError = User.create(
        userData.username,
        userData.email,
        userData.password,
      );

      expect(userOrError.isError()).toEqual(true);
      expect(userOrError.value).toEqual('Email must be an email');
    });

    it('Should return error message for creating email', () => {
      const userData = new UserWithInvalidEmailType();

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
      const userData = new UserWithEmptyPassword();

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
      const userData = new UserWithInvalidPasswordType();

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
