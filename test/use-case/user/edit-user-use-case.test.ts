import { CreateUserUseCase } from '../../../src/use-case/user/create-user-use-case';
import { EditUserUseCase } from '../../../src/use-case/user/edit-user-use-case';
import { InMemoryUserRepository } from '../../util/repositories/in-memory-user-repository';

describe('Edit user use case tests', () => {
  const userRepository = new InMemoryUserRepository();

  const createUserUseCase = new CreateUserUseCase(userRepository);
  const editUserUseCase = new EditUserUseCase(userRepository);

  it('Should return user edited', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const editUserData = {
      userId: '',
      username: 'b',
      email: 'a@gmail.com',
      password: '123456',
    };

    const createUserResponse = await createUserUseCase.perform(userData);

    editUserData.userId = createUserResponse.value.id;

    const editUserResponse = await editUserUseCase.perform(editUserData);

    expect(editUserResponse.isSuccess()).toEqual(true);
    expect(editUserResponse.value.id).toEqual(createUserResponse.value.id);

    await userRepository.deleteMany();
  });

  it('Should return error', async () => {
    const userData = {
      userId: '0',
      username: 'a',
      password: '123456',
    };

    const editUserResponse = await editUserUseCase.perform(userData);

    expect(editUserResponse.isError()).toEqual(true);
    expect(editUserResponse.value).toEqual('User not found');
  });

  it('Should not edit user', async () => {
    const userData1 = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const userData2 = {
      username: 'b',
      email: 'b@gmail.com',
      password: '123456',
    };

    const editUserData = {
      userId: '',
      username: 'b',
      password: '123456',
    };

    await createUserUseCase.perform(userData1);
    const createUserResponse = await createUserUseCase.perform(userData2);

    editUserData.userId = createUserResponse.value.id;

    const editUserResponse = await editUserUseCase.perform(editUserData);

    expect(editUserResponse.isError()).toEqual(true);
    expect(editUserResponse.value).toEqual('This username already exists');

    await userRepository.deleteMany();
  });
});
