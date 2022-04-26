import { CreateUserUseCase } from '../../../src/use-case/user/create-user-use-case';
import { InMemoryUserRepository } from '../../util/repositories/in-memory-user-repository';

describe('Create user use case tests', () => {
  const userRepository = new InMemoryUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);

  it('Should save new user', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const response = await createUserUseCase.perform(userData);

    expect(response.isSuccess()).toEqual(true);
    expect(response.isError()).toEqual(false);
    expect(response.value).toEqual({ id: '0' });

    await userRepository.delete(response.value.id);
  });

  it('Should not save user', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const successResponse = await createUserUseCase.perform(userData);

    const errorResponse = await createUserUseCase.perform(userData);

    expect(errorResponse.isError()).toEqual(true);
    expect(errorResponse.isSuccess()).toEqual(false);
    expect(errorResponse.value).toEqual('This username already exists');

    await userRepository.delete(successResponse.value.id);
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

    const successResponse = await createUserUseCase.perform(userData1);

    const errorResponse = await createUserUseCase.perform(userData2);

    expect(errorResponse.isError()).toEqual(true);
    expect(errorResponse.isSuccess()).toEqual(false);
    expect(errorResponse.value).toEqual('This email already exists');

    await userRepository.delete(successResponse.value.id);
  });
});