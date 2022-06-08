import { CreateUserUseCase } from '../../../src/use-case/user/create-user-use-case';
import { DeleteUserUseCase } from '../../../src/use-case/user/delete-user-use-case';
import { InMemoryUserRepository } from '../../util/repositories/in-memory-user-repository';

describe('Delete user use case tests', () => {
  const userRepository = new InMemoryUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);
  const createUserUseCase = new CreateUserUseCase(userRepository);

  it('Should delete user', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const createUserResponse = await createUserUseCase.perform(userData);

    const userId = createUserResponse.value.id;

    const deleteUserResponse = await deleteUserUseCase.perform(userId);

    expect(deleteUserResponse.isSuccess()).toEqual(true);
  });
});
