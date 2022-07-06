import { createHashPassword } from '../../../../src/infra/external/bcrypt/create-hash-password';
import { LoginUseCase } from '../../../../src/use-case/auth/login-use-case';
import { ValidUser } from '../../../util/data/user-data';
import { FakeUserRepository } from '../../../util/fake-repository/fake-user-repository';

describe('Login use case tests', () => {
  const userRepository = new FakeUserRepository();
  const loginUseCase = new LoginUseCase(userRepository);

  it('Should return access token end refresh token', async () => {
    const userData = new ValidUser();

    const loginData = {
      username: userData.username,
      password: userData.password,
    };

    const password = await createHashPassword(loginData.password);

    jest
      .spyOn(userRepository, 'findByUsername')
      .mockReturnValue(Promise.resolve({ id: 'userId', password: password }));

    const response = await loginUseCase.perform(loginData);

    expect(response.isSuccess()).toEqual(true);
  });

  it('Should return error message', async () => {
    const userData = new ValidUser();

    const loginData = {
      username: userData.username,
      password: userData.password,
    };

    jest
      .spyOn(userRepository, 'findByUsername')
      .mockReturnValue(Promise.resolve({ id: undefined, password: undefined }));

    const response = await loginUseCase.perform(loginData);

    expect(response.isError()).toEqual(true);
    expect(response.value).toEqual('Username or password invalid');
  });

  it('Should return error message', async () => {
    const userData = new ValidUser();

    const loginData = {
      username: userData.username,
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
