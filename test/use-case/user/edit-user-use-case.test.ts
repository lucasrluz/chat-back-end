import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../../../src/infra/external/prisma/repositories/prisma-user-repository';
import { CreateUserUseCase } from '../../../src/use-case/user/create-user-use-case';
import { EditUserUseCase } from '../../../src/use-case/user/edit-user-use-case';

describe('Edit user use case tests', () => {
  const prismaClient = new PrismaClient();

  const userRepository = new PrismaUserRepository();

  const createUserUseCase = new CreateUserUseCase(userRepository);
  const editUserUseCase = new EditUserUseCase(userRepository);

  beforeAll(async () => {
    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

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

    await prismaClient.user.deleteMany();
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
      username: 'a',
      password: '123456',
    };

    await createUserUseCase.perform(userData1);
    const createUserResponse = await createUserUseCase.perform(userData2);

    editUserData.userId = createUserResponse.value.id;

    const editUserResponse = await editUserUseCase.perform(editUserData);

    expect(editUserResponse.isError()).toEqual(true);
    expect(editUserResponse.value).toEqual('This username already exists');

    await prismaClient.user.deleteMany();
  });

  it('Should not edit user', async () => {
    const userData1 = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const editUserData = {
      userId: '',
      username: '',
      password: '123456',
    };

    const createUserResponse = await createUserUseCase.perform(userData1);

    editUserData.userId = createUserResponse.value.id;

    const editUserResponse = await editUserUseCase.perform(editUserData);

    expect(editUserResponse.isError()).toEqual(true);
    expect(editUserResponse.value).toEqual('Username should not be empty');

    await prismaClient.user.deleteMany();
  });
});
