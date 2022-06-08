import { compareHashPassword } from '../../../src/infra/external/bcrypt/compare-hash-password';
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
    expect(response.value).toEqual({ id: '0' });

    const user = await userRepository.findById('0');

    const comprarePassword = await compareHashPassword(
      userData.password,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user.password!,
    );

    expect(comprarePassword).toEqual(true);

    await userRepository.deleteMany();
  });

  it('Should not save user', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    await createUserUseCase.perform(userData);

    const errorResponse = await createUserUseCase.perform(userData);

    expect(errorResponse.isError()).toEqual(true);
    expect(errorResponse.value).toEqual('This username already exists');

    await userRepository.deleteMany();
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

    await createUserUseCase.perform(userData1);

    const errorResponse = await createUserUseCase.perform(userData2);

    expect(errorResponse.isError()).toEqual(true);
    expect(errorResponse.value).toEqual('This email already exists');

    await userRepository.deleteMany();
  });

  it('Should return error message', async () => {
    const userData = {
      username: '',
      email: 'a@gmail.com',
      password: '123456',
    };

    const response = await createUserUseCase.perform(userData);

    expect(response.isError()).toEqual(true);
    expect(response.value).toEqual('Username should not be empty');
  });
});
