import { createHashPassword } from '../../../src/infra/external/bcrypt/create-hash-password';
import { LoginUseCase } from '../../../src/use-case/auth/login-use-case';
import { FakeUserRepository } from '../../util/fake-repository/fake-user-repository';

describe('Login use case tests', () => {
  const userRepository = new FakeUserRepository();
  const loginUseCase = new LoginUseCase(userRepository);

  it('Should return access token end refresh token', async () => {
    const loginData = {
      username: 'a',
      password: '123456',
    };

    const password = await createHashPassword(loginData.password);

    jest
      .spyOn(userRepository, 'findByUsername')
      .mockReturnValue(Promise.resolve({ id: 'userId', password: password }));

    const response = await loginUseCase.perform(loginData);

    expect(response.isSuccess()).toEqual(true);
  });

  it('Should return error message', async () => {
    const loginData = {
      username: 'a',
      password: '123456',
    };

    jest
      .spyOn(userRepository, 'findByUsername')
      .mockReturnValue(Promise.resolve({ id: undefined, password: undefined }));

    const response = await loginUseCase.perform(loginData);

    expect(response.isError()).toEqual(true);
    expect(response.value).toEqual('Username or password invalid');
  });

  it('Should return error message', async () => {
    const loginData = {
      username: 'a',
      password: '654321',
    };

    jest
      .spyOn(userRepository, 'findByUsername')
      .mockReturnValue(
        Promise.resolve({ id: 'userId', password: 'userPassword' }),
      );

    const response = await loginUseCase.perform(loginData);

    expect(response.isError()).toEqual(true);
    expect(response.value).toEqual('Username or password invalid');
  });
});
