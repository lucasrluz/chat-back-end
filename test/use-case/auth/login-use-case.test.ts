import { createHashPassword } from '../../../src/infra/external/bcrypt/create-hash-password';
import { LoginUseCase } from '../../../src/use-case/auth/login-use-case';
import { InMemoryUserRepository } from '../../util/repositories/in-memory-user-repository';

describe('Login use case tests', () => {
  const userRepository = new InMemoryUserRepository();
  const loginUseCase = new LoginUseCase(userRepository);

  it('Should return access token end refresh token', async () => {
    const userData = {
      username: 'a',
      email: 'a@gamil.com',
      password: await createHashPassword('123456'),
    };

    const loginData = {
      username: 'a',
      password: '123456',
    };

    await userRepository.create(userData);

    const response = await loginUseCase.perform(loginData);

    expect(response.isSuccess()).toEqual(true);

    await userRepository.deleteMany();
  });

  it('Should return error message', async () => {
    const loginData = {
      username: 'a',
      password: '123456',
    };

    const response = await loginUseCase.perform(loginData);

    expect(response.isError()).toEqual(true);
    expect(response.value).toEqual('Username or password invalid');
  });

  it('Should return error message', async () => {
    const userData = {
      username: 'a',
      email: 'a@gamil.com',
      password: '123456',
    };

    const loginData = {
      username: 'a',
      password: '654321',
    };

    await userRepository.create(userData);

    const response = await loginUseCase.perform(loginData);

    expect(response.isError()).toEqual(true);
    expect(response.value).toEqual('Username or password invalid');

    await userRepository.deleteMany();
  });
});
