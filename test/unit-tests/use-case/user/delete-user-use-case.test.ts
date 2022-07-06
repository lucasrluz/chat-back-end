import { CreateUserUseCase } from '../../../../src/use-case/user/create-user-use-case';
import { DeleteUserUseCase } from '../../../../src/use-case/user/delete-user-use-case';
import { ValidUser } from '../../../util/data/user-data';
import { FakeUserRepository } from '../../../util/fake-repository/fake-user-repository';

describe('Delete user use case tests', () => {
  const userRepository = new FakeUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);
  const createUserUseCase = new CreateUserUseCase(userRepository);

  it('Should delete user', async () => {
    const userData = new ValidUser();

    jest.spyOn(userRepository, 'findById').mockReturnValue(
      Promise.resolve({
        id: 'userId',
        email: 'userEmail',
        username: 'username',
        password: 'userPassword',
      }),
    );

    const createUserResponse = await createUserUseCase.perform(userData);

    const userId = createUserResponse.value.id;

    const deleteUserResponse = await deleteUserUseCase.perform(userId);

    expect(deleteUserResponse.isSuccess()).toEqual(true);
  });
});
