import { PrismaClient } from '@prisma/client';
import { compareHashPassword } from '../../../src/infra/external/bcrypt/compare-hash-password';
import { PrismaUserRepository } from '../../../src/infra/external/prisma/repositories/prisma-user-repository';
import { CreateUserUseCase } from '../../../src/use-case/user/create-user-use-case';

describe('Create user use case tests', () => {
  const prismaClient = new PrismaClient();

  const userRepository = new PrismaUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);

  beforeAll(async () => {
    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should save new user', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };
    const response = await createUserUseCase.perform(userData);

    expect(response.isSuccess()).toEqual(true);

    const user = await userRepository.findById(response.value.id);

    const comprarePassword = await compareHashPassword(
      userData.password,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user.password!,
    );

    expect(comprarePassword).toEqual(true);

    await prismaClient.user.deleteMany();
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

    await prismaClient.user.deleteMany();
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

    await prismaClient.user.deleteMany();
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
