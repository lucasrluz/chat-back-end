import { CreateUserUseCase } from '../../../src/use-case/user/create-user-use-case';
import { EditUserUseCase } from '../../../src/use-case/user/edit-user-use-case';
import { FakeUserRepository } from '../../util/fake-repository/fake-user-repository';

describe('Edit user use case tests', () => {
  const userRepository = new FakeUserRepository();

  const createUserUseCase = new CreateUserUseCase(userRepository);
  const editUserUseCase = new EditUserUseCase(userRepository);

  it('Should return user edited', async () => {
    const editUserData = {
      userId: 'userId',
      username: 'b',
      email: 'a@gmail.com',
      password: '123456',
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
    const editUserData = {
      userId: 'userId',
      username: 'a',
      password: '123456',
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
    const editUserData = {
      userId: 'userId',
      username: '',
      password: '123456',
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
});
