import { EditUserUseCase } from '../../../../src/use-case/user/edit-user-use-case';
import {
  UserWithEmptyPassword,
  UserWithEmptyUsername,
  ValidUser,
} from '../../../util/data/user-data';
import { FakeUserRepository } from '../../../util/fake-repository/fake-user-repository';

describe('Edit user use case tests', () => {
  const userRepository = new FakeUserRepository();

  const editUserUseCase = new EditUserUseCase(userRepository);

  it('Should return user edited', async () => {
    const userData = new ValidUser();

    const editUserData = {
      userId: 'userId',
      username: 'b',
      email: userData.email,
      password: userData.password,
    };

    jest.spyOn(userRepository, 'findById').mockReturnValue(
      Promise.resolve({
        id: 'userId',
        username: 'username',
        email: 'userEmail',
        password: 'userPassword',
      }),
    );

    jest.spyOn(userRepository, 'findByUsername').mockReturnValue(
      Promise.resolve({
        id: undefined,
        password: undefined,
      }),
    );

    const editUserResponse = await editUserUseCase.perform(editUserData);

    expect(editUserResponse.isSuccess()).toEqual(true);
    expect(editUserResponse.value.id).toEqual('userId');
  });

  it('Should not edit user', async () => {
    const userData = new ValidUser();

    const editUserData = {
      userId: 'userId',
      username: userData.username,
      password: userData.password,
    };

    jest.spyOn(userRepository, 'findById').mockReturnValue(
      Promise.resolve({
        id: 'userId',
        username: 'username',
        email: 'userEmail',
        password: 'userPassword',
      }),
    );

    jest.spyOn(userRepository, 'findByUsername').mockReturnValue(
      Promise.resolve({
        id: 'userId',
        password: 'userPassword',
      }),
    );

    const editUserResponse = await editUserUseCase.perform(editUserData);

    expect(editUserResponse.isError()).toEqual(true);
    expect(editUserResponse.value).toEqual('This username already exists');
  });

  it('Should not edit user', async () => {
    const userData = new UserWithEmptyUsername();

    const editUserData = {
      userId: 'userId',
      username: userData.username,
      password: userData.password,
    };

    jest.spyOn(userRepository, 'findById').mockReturnValue(
      Promise.resolve({
        id: 'userId',
        username: 'username',
        email: 'userEmail',
        password: 'userPassword',
      }),
    );

    const editUserResponse = await editUserUseCase.perform(editUserData);

    expect(editUserResponse.isError()).toEqual(true);
    expect(editUserResponse.value).toEqual('Username should not be empty');
  });

  it('Should not edit user', async () => {
    const userData = new UserWithEmptyPassword();

    const editUserData = {
      userId: 'userId',
      username: userData.username,
      password: userData.password,
    };

    jest.spyOn(userRepository, 'findById').mockReturnValue(
      Promise.resolve({
        id: 'userId',
        username: editUserData.username,
        email: userData.email,
        password: '123456',
      }),
    );

    const editUserResponse = await editUserUseCase.perform(editUserData);

    expect(editUserResponse.isError()).toEqual(true);
    expect(editUserResponse.value).toEqual(
      'Password length must be longer than 6 characters',
    );
  });
});
