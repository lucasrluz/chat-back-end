import { CreateUserUseCase } from '../../../src/use-case/user/create-user-use-case';
import { FakeUserRepository } from '../../util/fake-repository/fake-user-repository';

describe('Create user use case tests', () => {
  const userRepository = new FakeUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);

  it('Should save new user', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    jest.spyOn(userRepository, 'findByUsername').mockReturnValue(
      Promise.resolve({
        id: undefined,
        password: undefined,
      }),
    );

    jest
      .spyOn(userRepository, 'findByEmail')
      .mockReturnValue(Promise.resolve({ id: undefined }));

    const response = await createUserUseCase.perform(userData);
    expect(response.isSuccess()).toEqual(true);
  });

  it('Should not save user', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    jest.spyOn(userRepository, 'findByUsername').mockReturnValue(
      Promise.resolve({
        id: 'userId',
        password: 'userPassword',
      }),
    );

    await createUserUseCase.perform(userData);

    const errorResponse = await createUserUseCase.perform(userData);

    expect(errorResponse.isError()).toEqual(true);
    expect(errorResponse.value).toEqual('This username already exists');
  });

  it('Should not save user', async () => {
    const userData1 = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const userData2 = {
      username: 'b',
      email: 'a@gmail.com',
      password: '123456',
    };

    jest.spyOn(userRepository, 'findByUsername').mockReturnValue(
      Promise.resolve({
        id: undefined,
        password: undefined,
      }),
    );

    jest
      .spyOn(userRepository, 'findByEmail')
      .mockReturnValue(Promise.resolve({ id: 'userId' }));

    await createUserUseCase.perform(userData1);

    const errorResponse = await createUserUseCase.perform(userData2);

    expect(errorResponse.isError()).toEqual(true);
    expect(errorResponse.value).toEqual('This email already exists');
  });

  it('Should return error message', async () => {
    const userData = {
      username: '',
      email: 'a@gmail.com',
      password: '123456',
    };

    jest.spyOn(userRepository, 'findByUsername').mockReturnValue(
      Promise.resolve({
        id: undefined,
        password: undefined,
      }),
    );

    jest
      .spyOn(userRepository, 'findByEmail')
      .mockReturnValue(Promise.resolve({ id: undefined }));

    const response = await createUserUseCase.perform(userData);

    expect(response.isError()).toEqual(true);
    expect(response.value).toEqual('Username should not be empty');
  });
});
